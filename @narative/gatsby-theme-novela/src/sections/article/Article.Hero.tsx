import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

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
        <DesignerType>
          {article.categories.join(', ')}
          {/* {article.categories.map((category, index) => (
            <span>
              <a href="">{category}</a>
              {index + 1 <  article.categories.length ? (
                <span>, </span>
              ) : ('')}
            </span>
          ))} */}
        </DesignerType>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>Portfolio of the Day ・ {article.date}</HeroSubtitle>
        <HeroSubtitle>Fonts: {article.font}</HeroSubtitle>
        <Excerpt>{article.excerpt}</Excerpt>
        <LinkButton href={article.siteLink + "?ref=folios"} target="_blank">Visit site → </LinkButton>
      </Header>
      <Link href={article.siteLink + "?ref=folios"} target="_blank">
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

const ArticleMeta = styled.div<{ hasCoAUthors: boolean }>`
  margin-left: ${p => (p.hasCoAUthors ? '10px' : '0')};

  ${mediaqueries.phablet`
    margin-left: 0;
  `}
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin:160px auto 56px;
  max-width: 749px;
  text-align: center;

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 64px auto 64px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto 48px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  margin-bottom: 24px;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
  `}
`;

const DesignerType = styled.p`
  letter-spacing: 0;
  font-size: 32px;
  line-height: 48px;
  color: ${p => p.theme.colors.secondary};
  font-weight: ${p => p.theme.fontsWeight.regular};

`;

const Excerpt = styled(Headings.h3)`
  font-size: 18px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 16px;
  margin-top: 16px;
  font-weight: normal;
  line-height: 32px;
  letter-spacing: 0;

  ${mediaqueries.tablet`
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
  `}
`;

const HeroSubtitle = styled(Headings.h5)`
  text-align: center;
  color: ${p => p.theme.colors.secondary};

`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
`;

const LinkButton = styled.a`
  position: relative;
  font-size: 16px;
  line-height: 32px;
  color: ${p => p.theme.colors.primary};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  margin: 0 auto;
  box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.secondary};
  padding: 4px 16px;
  transition: all 0.3s var(--ease-out-quad);
  border-radius: 4px;

  &:hover {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.background};
    box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.primary};
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