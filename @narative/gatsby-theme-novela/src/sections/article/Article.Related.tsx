import React from "react";
import styled from "@emotion/styled";

import Headings from "@components/Headings";

import mediaqueries from "@styles/media";
import { IArticle } from "@types";

import ListItem from '../articles/Article.Card';
import { AdsBlockCard } from '@components/Ads';


interface ArticlesNextProps {
  articles: IArticle[]
}

const RelatedArticle: React.FC<ArticlesNextProps> = ({ articles }) => {
  if (!articles) return null;

  const numberOfArticles = articles.length;

  return (
    <List>
        {articles.map((ap, index) => {
          return ( ( index === 1 ) ?
            <>
              <ListItem key={index} article={ap} />
              <AdsBlockCard />
            </>
            :
            <ListItem key={index} article={ap} />
          );
        })}
    </List>
  );
};

export default RelatedArticle;


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

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

