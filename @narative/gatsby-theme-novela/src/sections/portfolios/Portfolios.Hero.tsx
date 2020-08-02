import React, { useContext } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Section from '@components/Section';
import Headings from "@components/Headings";
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
              blogHeading
              blogSubtitle
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
        <Headings.h1 dangerouslySetInnerHTML={{ __html: hero.blogHeading }} />
        <InfoText>
          {hero.blogSubtitle}
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default PortfoliosHero;

const HeadingContainer = styled.div`
  margin: 176px 0 112px;
  
  ${mediaqueries.desktop`
    width: 80%;
  `}
  
  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const InfoText = styled.div`
  font-size: 20px;
  margin-top: 16px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};

  p {
    margin-top: 8px;
    ${mediaqueries.phablet`
      margin-top: 16px;
    `}
  }
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

const InternalLink = styled(Link)`
  ${linkCSS};
`;
