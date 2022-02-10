import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import Icons from "@icons";

import Image, { ImagePlaceholder } from '@components/Image';
import Headings from '@components/Headings';
import Section from '@components/Section';

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
        <RowTitle>
          <Title hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.date}
          </Title>
          <MetaData>
            {article.title} — {article.author}
          </MetaData>
        </RowTitle>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          { article.featured && <Badge> <Icons.StaffPicks /> </Badge> }
          
          {hasHeroImage ? <Image src={imageSource}  alt={article.title} imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }} /> : <ImagePlaceholder />}
        </ImageContainer>
      </Item>
    </ArticleLink>
  );
};

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

const ArticlesListContainer = styled(Section)`
  transition: opacity 0.25s;

  ${mediaqueries.tablet`
    padding: 0;
  `}

`;


const List = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2;
  column-gap: 64px;
  row-gap: 160px;
  
  &:not(:last-child) {
    margin-bottom: 75px;
  }
  
  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const Item = styled.div`
  position: relative;
`;

const Badge = styled.span`
    position: absolute;
    top: 0;
    right: 24px;
    z-index: 1;
    transition: transform 0.33s var(--ease-out-quart);

    box-shadow: 
      0px 32px 64px rgba(0, 0, 0, 0.06), 
      0px 16px 32px rgba(0, 0, 0, 0.06), 
      0px 8px 16px rgba(0, 0, 0, 0.06), 
      0px 4px 4px rgba(0, 0, 0, 0.06), 
      0px 2px 2px rgba(0, 0, 0, 0.06);
    
    ${mediaqueries.phablet`
      transform: scale(0.8);
      top: -4px;
      right: -8px;
    `}
`;


const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: 800px;
  margin-bottom: 8px;
  transition: all 0.25s var(--ease-out-quad);
  // border: 4px solid ${p => p.theme.colors.card};

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
    height: calc(100% + 4px);
    opacity: 0;
    transition: all 0.25s var(--ease-out-quad);
    box-shadow: 0 30px 40px -20px rgba(119, 90, 67, 0.18),
      0 30px 30px -30px rgba(119, 90, 67, 0.4);
  }

  ${mediaqueries.tablet`
    height: 700px;
    overflow: hidden;
    margin-bottom: 0;
  `}

`;

const RowTitle = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 24px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    padding: 0 16px;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 56px;
  line-height: 64px;
  font-family: ${p => p.theme.fonts.title};
  letter-spacing: -2px;
  transition: color 0.3s ease-in-out;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 8px;
  ${limitToOneLines};

  ${mediaqueries.tablet`
    font-size: 52px;
    line-height: 60px;
  `}

`;

const MetaData = styled(Headings.h6)`
  color: ${p => p.theme.colors.primary};
  ${limitToOneLines};
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

  // &:hover ${ImageContainer}, &:focus ${ImageContainer}, &:hover ${Badge} {
  //   &::after {
  //     opacity: 1;
  //   }
  //   transform: translateY(-1px);
  // }

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
