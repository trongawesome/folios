import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from '../articles/Articles.List.Context';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const PortfoliosHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  const featuredAuthor = authors.find(author => author.featured);

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.Trong test ssh.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <Section narrow id="Portfolios__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
        <InfoText>
          Currently, I'm building Design System and improving Web Experience at 
          <Anchor target="_blank" href="http://carousell.com">
            Carousell.
          </Anchor>
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default PortfoliosHero;

const HeadingContainer = styled.div`
    margin: 104px 0 72px;
  
  ${mediaqueries.desktop`
    width: 80%;
  `}
  
  ${mediaqueries.tablet`
  width: 100%;
  `}
  `;
  
  const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: ${p => p.theme.fontsWeight.bold};
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
    font-size: 48px;
  `}
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-top: 24px;
  line-height: 1.8;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
`;

const Anchor = styled.a`
  color: ${p => p.theme.colors.secondary};
  border-bottom: 1px solid ${p => p.theme.colors.secondary};
  margin-left: 6px;
  
  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }
`;