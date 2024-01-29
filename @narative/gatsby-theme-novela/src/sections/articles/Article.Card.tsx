import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import Icons from "@icons";

import Image, { ImagePlaceholder } from '@components/Image';
import Headings from '@components/Headings';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

interface ArticlesListItemProps {
  article: IArticle;
  counter?: number;
}

const ListItem: React.FC<ArticlesListItemProps> = ({ article, counter }) => {
    if (!article) return null;
  
    const imageSource = article.hero.narrow;
    const hasHeroImage =
      imageSource &&
      Object.keys(imageSource).length !== 0 &&
      imageSource.constructor === Object;
  
    return (
      <ArticleLink to={article.slug} data-a11y="false">
        <Item>
          <RowTitle>
            <Title>
              {article.title}
            </Title>
            <MetaData>
              {article.author}
            </MetaData>
          </RowTitle>
          <ImageContainer>
            { article.featured && <Badge> <Icons.StaffPicks /> </Badge> }
            
            {hasHeroImage ? <Image src={imageSource}  alt={article.title} imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }} /> : <ImagePlaceholder />}
          </ImageContainer>
        </Item>
      </ArticleLink>
    );
  };

export default ListItem;

  
const limitToOneLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
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

`;


const ImageContainer = styled.div`
  position: relative;
  height: 800px;
  margin-bottom: 8px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px ${p => p.theme.colors.card};
  overflow: hidden;
  transition: all .3s var(--bounce);

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
    border-radius: 0;
    border: 0;
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
  font-size: 36px;
  line-height: 48px;
  font-family: ${p => p.theme.fonts.title};
  letter-spacing: -1px;
  transition: color 0.3s ease-in-out;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 8px;
  word-break: break-all;
  ${limitToOneLines};

  ${mediaqueries.tablet`
    font-size: 38px;
    line-height: 48px;
  `}

`;

const MetaData = styled(Headings.h6)`
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  font-size: 16px;
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

  &:hover ${ImageContainer} {
    box-shadow: 0 0 0 1px ${p => p.theme.colors.primary}, 0 6px 0 -2px ${p => p.theme.colors.primary};
    transform: translateY(-6px);
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
