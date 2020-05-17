import React, { useContext } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
          <p>
            In the free time, I share my love for design in
            <InternalLink to={`/design-tips`} title={`Visual storytelling`}>
              the visual language.
            </InternalLink>
          </p>
          <p>
            And making stuff for my side project
            <Anchor target="_blank" href="https://awesomefigmatips.com">
              Awesome Figma Tips.
            </Anchor>
          </p>
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
    font-size: 64px;
    line-height: 1.15;
    font-family: ${p => p.theme.fonts.title};
    color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 56px
  `}
`;

const InfoText = styled.p`
  font-size: 20px;
  margin-top: 16px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
`;

const linkCSS = p => css`
  color: ${p.theme.colors.secondary};
    border-bottom: 1px solid ${p.theme.colors.secondary};
    margin-left: 6px;
    
    &:hover,
    &:focus {
      color: ${p.theme.colors.accent};
      border-bottom-color: ${p.theme.colors.accent};
    }
`;

const Anchor = styled.a`
  // color: ${p => p.theme.colors.secondary};
  // border-bottom: 1px solid ${p => p.theme.colors.secondary};
  // margin-left: 6px;
  
  // &:hover,
  // &:focus {
  //   color: ${p => p.theme.colors.accent};
  //   border-bottom-color: ${p => p.theme.colors.accent};
  // }
  ${linkCSS};
`;

const InternalLink = styled(Link)`
  ${linkCSS};
`;
