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

const ListItem: React.FC<ArticlesListItemProps> = ({ article }) => {
  if (!article) return null;

  const imageSource = article.hero.narrow;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item>
        <ImageContainer>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
        <TextContainer>
          <Author>{article.author}</Author>
          <Title> 
            {article.title}
          </Title>
          <Excerpt>
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

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
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

const listItemTile = p => css`
  position: relative;
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
  height: 624px;
  ${listItemTile}

  ${mediaqueries.desktop`
    height: 536px;
  `}

  ${mediaqueries.tablet`
    height: 600px;
  `}

  ${mediaqueries.phone`
    height: 536px;
  `}
`;
  
const ImageContainer = styled.div`
  position: relative;
  margin: 56px auto 32px auto;
  box-shadow: 8px 12px 32px rgba(0, 0, 0, 0.16);
  height: auto;
  transition: transform 0.3s var(--ease-out-quad),
  box-shadow 0.3s var(--ease-out-quad);
  width: 320px;

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
    background-image: url(/utils/shadow.png);
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
    width: 264px;
  `}

  ${mediaqueries.tablet`
    width: 304px;
  `}

  ${mediaqueries.phone`
    width: 264px;
    margin-top: 32px;
  `}

`;

const TextContainer = styled.div`
  position: relative;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;

  ${mediaqueries.desktop`
    padding-left: 24px;
    padding-right: 24px;
  `}
`;

const ContentContainer = styled.div`
  position: relative;
`;

const Title = styled(Headings.h2)`
  font-size: 24px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 8px;
  transition: color 0.3s ease-in-out;
  ${limitToOneLines};

  ${mediaqueries.desktop`
    font-size: 22px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;  
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
  `}
`;

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 8px;
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  display: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box')};
  max-width: 515px;
  line-height: 1.6;

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
  `}
`;

const Author = styled.div`
  font-size: 14px;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 8px;
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  margin-bottom: 30px;
  background: ${p => p.theme.colors.card};
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
