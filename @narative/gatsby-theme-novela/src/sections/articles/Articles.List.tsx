import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
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
      <List>
        {articles.map((ap, index) => {
          return (
            <ListItem key={index} article={ap} />
          );
        })}
      </List>
    </ArticlesListContainer>
  );
};

export default ArticlesList;

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = article.hero.narrow;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource}  alt={article.title} imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }} /> : <ImagePlaceholder />}
        </ImageContainer>
        <div>
          <RowTitle>
            <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
              {article.title}
            </Title>
            <MetaData>
              {article.date}
            </MetaData>
          </RowTitle>
          <Excerpt>
            {article.categories.join(', ')}
          </Excerpt>
        </div>
      </Item>
    </ArticleLink>
  );
};

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


const List = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2;
  column-gap: 32px;
  row-gap: 40px;
  
  &:not(:last-child) {
    margin-bottom: 75px;
  }
  
  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.phablet`
    grid-template-columns: 1fr 1fr;
    column-gap: 8px;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const Item = styled.div`
  position: relative;

  @media (max-width: 540px) {
    background: ${p => p.theme.colors.card};
  }
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: 528px;
  margin-bottom: 8px;
  transition: all 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.3s var(--ease-out-quad);
    box-shadow: 0 30px 40px -20px rgba(0, 0, 0, 0.12),
      0 30px 30px -30px rgba(0, 0, 0, 0.32);
  }

  ${mediaqueries.tablet`
    height: 480px;
  `}
  
  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    height:320px;
  `}

  ${mediaqueries.phone`
    height: 240px;
  `}
`;

const RowTitle = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: start;
  justify-content: space-between;  

  ${mediaqueries.phablet`
    grid-template-columns: 1fr;
    margin-top: 8px;
  `}
`;

const Title = styled.h2`
  font-size: 18px;
  line-height: 24px;
  font-family: ${p => p.theme.fonts.title};
  letter-spacing: 0;
  transition: color 0.3s ease-in-out;
  color: ${p => p.theme.colors.primary};
  ${limitToOneLines};

  ${mediaqueries.phablet`
    font-size: 14px;
  `}

`;

const Excerpt = styled.p`
  ${limitToOneLines};
  font-size: 14px;
  line-height: 24px;
  color: ${p => p.theme.colors.secondary};
`;

const MetaData = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${p => p.theme.colors.grey};
  text-align: right;
  ${limitToOneLines};

  ${mediaqueries.phablet`
    max-width: 100%;
    text-align: left;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    &::after {
      opacity: 1;
    }
    transform: translateY(-1px);
  }

  &:hover h2,
  &:focus h2 {
    // color: ${p => p.theme.colors.accent};
  }

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
