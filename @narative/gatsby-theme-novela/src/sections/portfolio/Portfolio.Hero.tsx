import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image from '@components/Image';
import HorizontalRule from '@components/HorizontalRule';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasCoAUthors = authors.length > 1;
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {article.date}
          </ArticleMeta>
        </HeroSubtitle>
        <Excerpt>{article.excerpt}</Excerpt>
      </Header>
      { !hasHeroImage ?
        <HorizontalRule />
        :
        <HeroImage>
          <Image src={article.hero.full} /> 
        </HeroImage>
      }
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  position: relative;
`;

const ArticleMeta = styled.div<{ hasCoAUthors: boolean }>`
  text-align: center;
  font-size: 14px;
  font-weight: ${p => p.theme.fontsWeight.regular};
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  text-transform: uppercase;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  max-width: 740px;
  padding: 0 16px;
  margin-top: 176px;
  margin-left: auto;
  margin-right: auto;

  ${mediaqueries.tablet`
    margin-bottom: 40px;
  `}
  
`;

const HeroHeading = styled(Headings.h1)`
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 16px;
  text-align: center;
  font-weight: ${p => p.theme.fontsWeight.bold};

  ${mediaqueries.tablet`
    margin-bottom: 20px;
  `}
`;

const Excerpt = styled(Headings.h3)`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  text-align: center;
  margin-top:8px;
  margin-bottom: 16px;
  font-weight: ${p => p.theme.fontsWeight.regular};
  line-height: 1.5;

  ${mediaqueries.tablet`
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
  `}
`;

const HeroSubtitle = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  font-size: 18px;
  color: ${p => p.theme.colors.secondary};
  align-items: center;
  
  ${p => mediaqueries.phablet`
    flex-direction: column;
    align-items: left;
    align-items: flex-start;

    ${p.hasCoAUthors &&
      `
        &::before {
          content: '';
          position: absolute;
          left: -20px;
          right: -20px;
          top: -10px;
          bottom: -10px;
          border: 1px solid ${p.theme.colors.horizontalRule};
          opacity: 0.5;
          border-radius: 5px;
        }
    `}


    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  max-width: 944px;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
  padding: 16px 0;
  
  ${mediaqueries.phablet`
    margin: 0 auto;
    width: 100%;
  `}
`;
