import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import { LinkInternal } from "@components/LinkNav";
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

  console.log(article.hero.full);

  return (
    <Hero style={{
        backgroundImage: `url(${article.hero.full.base64})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <Header>
        <DesignerType>
          {authors.map((author, index) => (
            <span>
              <LinkInternal to={author.slug} key={index}>{author.name}</LinkInternal>
              {index + 1 < authors.length ? (
                <span> &nbsp; / &nbsp; </span>
              ) : ('')}
            </span>
          ))}
        </DesignerType>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>Portfolio of the Day — {article.date}</HeroSubtitle>
        {article.font && <HeroSubtitle>Fonts: {article.font}</HeroSubtitle>}
        <Excerpt>{article.excerpt}</Excerpt>
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
  padding-bottom: 160px;
  margin-bottom: -160px;

  ${mediaqueries.tablet`
    margin-bottom: -120px;
  `}

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
  margin: 0 auto 56px;
  padding-top: 160px;
  max-width: 749px;
  text-align: center;

  ${mediaqueries.desktop`
    margin: 0 auto 70px;
    padding-top: 140px;
  `}

  ${mediaqueries.tablet`
    margin: 0 auto 70px;
    padding-top: 100px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto 64px;
    padding-top: 128px;
    padding: 0 16px;
  `}

  @media screen and (max-height: 700px) {
    margin: 0 auto 48px;
    padding-top: 100px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  margin-bottom: 16px;
  ${p => p.theme.textGradient};
  display: inline-block;
  padding-right: 2px;

  ${mediaqueries.tablet`
    margin-bottom: 16px;
  `}
`;

const DesignerType = styled.p`
  letter-spacing: 0;
  font-size: 12px;
  line-height: 24px;
  color: ${p => p.theme.colors.grey};
  font-weight: ${p => p.theme.fontsWeight.regular};
  font-family: ${p => p.theme.fonts.title};
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: .8;
  
  a {
    box-shadow: inset 0 -2px 0 ${p => p.theme.colors.horizontalRule};
  }
`;

const Excerpt = styled.h3`
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.grey};
  opacity: .8;
  margin-top: 16px;
  font-weight: normal;

`;

const HeroSubtitle = styled(Headings.h5)`
  text-align: center;
  color: ${p => p.theme.colors.grey};


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
  transition: opacity 0.25s var(--ease-in-out-quad);
  display: inline-block;
  padding: 4px 16px;
  transition: all 0.3s var(--ease-out-quad);
  border-radius: 4px;

  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.background};
  box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.primary};

  &:hover {
    opacity: .7;
  }

  svg {
    margin-left: 4px;  
  }

  svg path {
    transition: all 0.3s var(--ease-out-quad);
    fill: ${p => p.theme.colors.background} !important;
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