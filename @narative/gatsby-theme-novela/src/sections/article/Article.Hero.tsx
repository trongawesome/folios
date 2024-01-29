import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import { LinkInternal } from "@components/LinkNav";
import Icons from "@icons";

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import { AdsBlockVertical } from '@components/Ads';

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
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      
      <HeroImageWrapper>
        <Link>
          <HeroImage id="ArticleImage__Hero">
            {hasHeroImage ? (
              <Image src={article.hero.full} alt={article.title}/>
            ) : (
              <ImagePlaceholder />
            )}
          </HeroImage>
        </Link>
        <HeroBackground style={{
          backgroundImage: `url(${article.hero.tiny.src})`,
        }}>

        </HeroBackground>
      </HeroImageWrapper>

      <Header>
        <HeaderInner>
          <HeaderWrapper>
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
            {article.font && <HeroSubtitle>Fonts — {article.font}</HeroSubtitle>}
            {/* <Excerpt>{article.excerpt}</Excerpt> */}
            <LinkButton href={article.siteLink + "?ref=pafolios"} target="_blank" rel="noopener">Visit site <Icons.ArrowExternal /> </LinkButton>
          </HeaderWrapper>
          
          <AdsBlockVertical/>
        </HeaderInner>
      
      </Header>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  padding-bottom: 160px;
  margin: 200px auto 0 auto;
  max-width: 1296px;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 65% auto;
  column-gap: 64px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    padding: 0 16px;

  `}
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 0;
  padding-top: 24px;
`;

const HeaderWrapper = styled.div`
  // position: sticky;
  // top: 24px;
`;

const HeaderInner = styled.div`
  position: sticky;
  top: 24px;

  ${mediaqueries.tablet`
    position: relative;
  `}
`;

const HeroHeading = styled(Headings.h1)`
  font-size: 52px;
  line-height: 56px;
  margin-bottom: 16px;
  display: inline-block;
  padding-right: 2px;

  ${mediaqueries.tablet`
    margin-bottom: 16px;
    font-size: 46px;
    line-height: 1.1;
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
  // color: ${p => p.theme.colors.grey};

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
  border-radius: 12px;
  border: 1px solid ${p => p.theme.colors.card};
  background-color: ${p => p.theme.colors.card};
  box-shadow: ${p => p.theme.colors.softShadow};
`;

const LinkButton = styled.a`
  position: relative;
  font-size: 16px;
  line-height: 32px;
  margin-top: 24px;
  display: inline-block;
  padding: 8px 20px;
  border-radius: 24px;
  background-color: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.black};

  transition: all .3s var(--bounce);
  // box-shadow: 0 0 0 1px ${p => p.theme.colors.primary};

  &:hover {
    box-shadow: 0 0 0 1px ${p => p.theme.colors.primary}, 0 5px 0 0 ${p => p.theme.colors.primary};
    transform: translateY(-5px);
  }

  svg {
    margin-left: 4px;  
  }

  svg path {
    transition: all 0.3s var(--ease-out-quad);
    fill: ${p => p.theme.colors.black} !important;
  }
`;

const Link = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  ${mediaqueries.tablet`
    padding: 0;
  `}
`;

const HeroImageWrapper = styled.div`
  position: relative;

`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(60px);
  opacity: .6;
`;
