import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image from '@components/Image';

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
        <Excerpt>{article.excerpt}</Excerpt>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {article.date}
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      { hasHeroImage && 
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
  margin: 0px auto 56px;
  // max-width: 944px;
  padding: 124px 128px 0px;

  ${mediaqueries.desktop`
    margin: 0 auto 70px;
    padding-left: 0;
    padding-right: 0;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 0;
    margin-bottom: 40px;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto 32px;
    padding: 96px 0px 0px;
  `}

  @media screen and (max-height: 700px) {
    margin: 0 auto 48px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 25px;
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
  margin-bottom: 24px;
  margin-top: 24px;
  font-weight: ${p => p.theme.fontsWeight.light};
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
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
  padding: 32px;
  
  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    padding: 16px
  `}
`;
