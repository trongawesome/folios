import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from '../articles/Articles.List.Context';

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
}

const ReaddingsList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []);

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      {articlePairs.map((ap, index) => {
        const isEven = index % 2 !== 0;
        const isOdd = index % 2 !== 1;

        return (
          <List
            key={index}
            gridLayout={gridLayout}
            hasOnlyOneArticle={hasOnlyOneArticle}
            reverse={isEven}
          >
            <ListItem article={ap[0]} narrow={isEven} />
            <ListItem article={ap[1]} narrow={isOdd} />
          </List>
        );
      })}
    </ArticlesListContainer>
  );
};

export default ReaddingsList;

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
        <TextContainer>
          <Author>{article.author}</Author>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt
            narrow={narrow}
            hasOverflow={hasOverflow}
            gridLayout={gridLayout}
          >
            {article.excerpt}
          </Excerpt>
        </TextContainer>
        <ContentContainer>
        </ContentContainer>
      </Item>
    </ArticleLink>
  );
};

const wide = '1fr';
const narrow = '457px';

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const limitToOneLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const listTile = p => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse
    ? `${wide} ${wide}`
    : `${wide} ${wide}`};
  grid-template-rows: 2;
  column-gap: 30px;

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const listItemRow = p => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    
  `}
`;

const listItemTile = p => css`
  position: relative;
  background: ${p.theme.colors.card};
`;

// If only 1 article, dont create 2 rows.
const listRow = p => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
  hasOnlyOneArticle: boolean;
}>`
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`;

const Item = styled.div<{ gridLayout: string }>`
  height: 680px;
  padding-top: 48px;
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  margin: 0 auto 32px auto;
  box-shadow: 8px 12px 32px rgba(0, 0, 0, 0.16);
  width: 320px;
  height: 438px;
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;

    ::before {
      background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 90%);
      box-shadow: 1px 0 rgba(0, 0, 0, 0.1), 2px 0 0px rgba(255, 255, 255, 0.1);
      content: "";
      display: block;
      height: 100%;
      position: absolute;
      width: 6px;
      z-index: 2;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  ::before {
    background-image: url(./utils/shadow.png);
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
    content: " ";
    display: block;
    height: 100%;
    right: 99%;
    position: absolute;
    top: 0;
    transform-origin: center right;
    width: 100%;
    z-index: 0;
    pointer-events: none;
  }

  ${mediaqueries.desktop`
    height: 500px;
  `}

  ${mediaqueries.tablet`
    height: 480px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
  `}
`;

const TextContainer = styled.div`
  position: relative;
  padding: 0 40px 32px;
  text-align: center;

  ${mediaqueries.phablet`
    padding: 40px 32px;
  `}
`;

const ContentContainer = styled.div`
  position: relative;
`;

const Title = styled(Headings.h2)`
  font-size: 24px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.textTitle};
  opacity: .8;
  margin-bottom: 8px;
  transition: color 0.3s ease-in-out;
  ${limitToOneLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;  
  `}

  ${mediaqueries.phablet`
    font-size: 22px;  
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p<{
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 8px;
  color: ${p => p.theme.colors.textTitle};
  opacity: .7;
  font-family: ${p => p.theme.fonts.body};
  display: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box')};
  max-width: 515px;
  line-height: 22px;

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    margin-bottom; 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`;

const Author = styled.div`
  font-size: 14px;
  color: ${p => p.theme.colors.textTitle};
  font-family: ${p => p.theme.fonts.title};
  opacity: .8;
  margin-bottom: 8px;
`;

const MetaData = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.33;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 30px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
