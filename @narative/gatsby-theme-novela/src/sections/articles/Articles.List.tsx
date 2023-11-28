import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';

import Section from '@components/Section';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import ListItem from './Article.Card';
// import { AdsBlockCard } from '@components/Ads';
import PartnersList from '@components/PartnersList';



const siteQuery = graphql`
  {
    allArticle {
      totalCount
    }
  }
`;

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
  currentPage: number;
}

interface ArticlesListItemProps {
  article: IArticle;
  counter: number;
  narrow?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
  currentPage
}) => {
  if (!articles) return null;

  const result = useStaticQuery(siteQuery);
  const totalCount = result.allArticle.totalCount;
  const pageLength = 36;
  const sumArticlesInPreviousPage = (currentPage - 1) * pageLength;

  return (
    <ArticlesListContainer>
      <List>
        {articles.map((ap, index) => {
          return ( ( index === 2 || index === 9 || index === 17 || index === 28 || index === 36) ?
              <>
                <ListItem key={index} article={ap} counter={totalCount - index - sumArticlesInPreviousPage} />
                <PartnersList />
              </>
            :
            <ListItem key={index} article={ap} counter={totalCount - index - sumArticlesInPreviousPage} />
          );
        })}
      </List>
    </ArticlesListContainer>
  );
};

export default ArticlesList;

const limitToOneLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2;
  column-gap: 48px;
  row-gap: 120px;
  
  &:not(:last-child) {
    margin-bottom: 75px;
  }
  
  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
    column-gap: 32px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    row-gap: 80px;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;
