import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import ArticleAuthors from './Article.Authors';

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
        <HeroSubtitle>Fonts: Flareserif 821, Favorit, Adieu</HeroSubtitle>
        <Excerpt>{article.excerpt}</Excerpt>
        {/* <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleAuthors authors={authors} />
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {article.date}
          </ArticleMeta>
        </HeroSubtitle> */}
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? (
          <Image src={article.hero.full} />
        ) : (
          <ImagePlaceholder />
        )}
      </HeroImage>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${p => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 0;
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
  padding-left: 68px;
  max-width: 749px;

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
  text-align: center;

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
  text-align: center;

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
  text-align: center;

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

// const HeroSubtitle = styled.div<{ hasCoAUthors: boolean }>`
//   position: relative;
//   display: flex;
//   font-size: 14px;
//   color: ${p => p.theme.colors.secondary};
//   align-items: center;
  
//   ${p => mediaqueries.phablet`
//     flex-direction: column;
//     align-items: left;
//     align-items: flex-start;

//     ${p.hasCoAUthors &&
//       `
//         &::before {
//           content: '';
//           position: absolute;
//           left: -20px;
//           right: -20px;
//           top: -10px;
//           bottom: -10px;
//           border: 1px solid ${p.theme.colors.horizontalRule};
//           opacity: 0.5;
//           border-radius: 5px;
//         }
//     `}


//     strong {
//       display: block;
//       font-weight: 500;
//       margin-bottom: 5px;
//     }
//   `}
// `;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
`}
`;
