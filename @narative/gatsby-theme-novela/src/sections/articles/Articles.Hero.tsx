import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              writingHeading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  
  // Hide author
  // const featuredAuthor = authors.find(author => author.featured);

  // if (!featuredAuthor) {
  //   throw new Error(`
  //     No featured Author found.Trong test ssh.
  //     Please ensure you have at least featured Author.
  // `);
  // }

  return (
    <Section relative id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.writingHeading }} />
        <InfoText>
          Without words, apps would be an unusable jumble of shapes and icons.
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const HeadingContainer = styled.div`
  margin: 100px 0;
  
  ${mediaqueries.desktop`
  width: 80%;
  `}
  
  ${mediaqueries.tablet`
  width: 100%;
  `}
  `;
  
  const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.25;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 54px;
  `}
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-top: 24px;
  line-height: 1.8;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
`;

