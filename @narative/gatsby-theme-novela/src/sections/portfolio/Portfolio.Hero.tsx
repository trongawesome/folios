import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import Section from "@components/Section";

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const PortfolioHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <HeroImage id="PortfolioImage__Hero">
      {hasHeroImage ? (
          <Image src={article.hero.full} />
      ) : (
          <ImagePlaceholder />
      )}
      </HeroImage>
      <Section>
        <Header>
          <HeroHeading>{article.title}</HeroHeading>
          <HeroSubtitle>{article.excerpt}</HeroSubtitle>
        </Header>
      </Section>

      <OverlayCover />
      
    </Hero>
  );
};

export default PortfolioHero;

const Hero = styled.div`
    margin-top: -96px;
    position: relative;
  ${p => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: -10px;;
      transition: ${p.theme.colorModeTransition};
    }

    &::after {
      content: "";
      width: 100%;
      height: 10px;
      background: ${p.theme.colors.background};
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: ${p.theme.colorModeTransition};
    }
  `}
`;

const Header = styled.header`
  position: absolute;
  top: 150px;
  z-index: 10;
  margin: 100px auto 56px;
  max-width: 510px;

  ${mediaqueries.desktop`
    max-width: 385px;
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 64px auto 8px;
    bottom: 0;
    top: auto;
    text-align: center;
    `}
    
  ${mediaqueries.phablet`
    padding-right: 4rem;
  `}
`;

const HeroHeading = styled(Headings.h1)`
  font-size: 48px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.textTitle};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;
  opacity: .9;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}
`;

const HeroSubtitle = styled.div`
  position: relative;
  font-size: 18px;
  color: ${p => p.theme.colors.textTitle};
  align-items: center;
  opacity: .7;
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  height: 100vh;

    & > div {
      height: 100vh;
    }


  ${mediaqueries.tablet`
    max-width: 100%;
    height: 70vh;

    & > div {
      height: 70vh;
    }
  `}

  ${mediaqueries.phablet`
    margin-top: 24px;
    height: 500px;
    border-radius: 10px 10px 0 0;

    & > div {
      height: 500px;
    }
`}
`;

const OverlayCover = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60%;
    background: ${p => p.theme.colors.gradientImage};
    transition: ${p => p.theme.colorModeTransition};
    z-index: 1;

    display: none; // hide on desktop

    ${mediaqueries.tablet`
      display: block;
    `}
`;
