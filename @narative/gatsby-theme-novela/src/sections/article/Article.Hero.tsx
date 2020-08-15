import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import Icons from "@icons";

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        {/* <DesignerType>
          {article.categories.join(', ')}
          {article.categories.map((category, index) => (
            <span>
              <a href="">{category}</a>
              {index + 1 <  article.categories.length ? (
                <span>, </span>
              ) : ('')}
            </span>
          ))} 
        </DesignerType> */}
        <HeroHeading>{article.title}</HeroHeading>
        <Excerpt>{article.excerpt}</Excerpt>
        <HeroSubtitle>Portfolio of the Day ・ {article.date}</HeroSubtitle>
        {article.font && <HeroSubtitle>Fonts: {article.font}</HeroSubtitle>}
        <LinkButton href={article.siteLink + "?ref=pafolios"} target="_blank" rel="noopener">Visit site <Icons.ArrowExternal /> </LinkButton>
      </Header>
      <Link href={article.siteLink + "?ref=pafolios"} target="_blank" rel="noopener">
        <HeroImage id="ArticleImage__Hero">
          {hasHeroImage ? (
            <Image src={article.hero.full} alt={article.title}/>
          ) : (
            <ImagePlaceholder />
          )}
        </HeroImage>
      </Link>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${p => mediaqueries.phablet`
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
  position: relative;
  z-index: 10;
  margin: 160px auto 56px;
  max-width: 749px;
  text-align: center;

  ${mediaqueries.desktop`
    margin: 140px auto 70px;
  `}

  ${mediaqueries.tablet`
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 128px auto 64px;
    padding: 0 16px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto 48px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  margin-bottom: 16px;

  ${mediaqueries.tablet`
    margin-bottom: 16px;
  `}
`;

const DesignerType = styled.p`
  letter-spacing: 0;
  font-size: 32px;
  line-height: 48px;
  color: ${p => p.theme.colors.secondary};
  font-weight: ${p => p.theme.fontsWeight.regular};

`;

const Excerpt = styled.h3`
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 16px;
  font-weight: normal;
`;

const HeroSubtitle = styled(Headings.h5)`
  text-align: center;
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.phablet`
    font-size: 18px;
    line-height: 28px;
  `}

`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  border: 4px solid ${p => p.theme.colors.card};
  // box-shadow: 0px 2px 6px rgba(119, 90, 67, 0.15);
  box-shadow: ${p => p.theme.colors.softShadow};
`;

const LinkButton = styled.a`
  position: relative;
  font-size: 16px;
  line-height: 32px;
  margin-top: 24px;
  color: ${p => p.theme.colors.primary};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.secondary};
  padding: 4px 16px;
  transition: all 0.3s var(--ease-out-quad);
  border-radius: 4px;

  &:hover {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.background};
    box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.primary};
  }

  svg {
    margin-left: 4px;  
  }

  &:hover svg path {
    transition: all 0.3s var(--ease-out-quad);
    fill: ${p => p.theme.colors.background};
  }
`;

const Link = styled.a`
  position: relative;
  display: block;
  margin: 0 auto;
  max-width: 1296px;
  padding: 0 48px;
  ${mediaqueries.tablet`
    padding: 0;
  `}
`;