import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Section from '@components/Section';
import Headings from "@components/Headings";
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              featuredArticlesHeading
              featuredArticlesSubtitle
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const FeaturedArticlesHero: React.FC<IAuthor> = ({ }) => {

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;

  return (
    <Section narrow id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <SubHeading dangerouslySetInnerHTML={{ __html: hero.featuredArticlesHeading }} />
        <InfoText>
          {hero.featuredArticlesSubtitle}
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default FeaturedArticlesHero;

const HeadingContainer = styled.div`
  margin: 200px auto 112px auto;
  
  ${mediaqueries.desktop`
    width: 80%;
  `}
  
  ${mediaqueries.tablet`
    width: 100%;
  `}
  `;

const SubHeading = styled(Headings.h1)`
  // ${p => p.theme.textGradient};
  text-align: center;
`;

const InfoText = styled.h3`
  font-size: 22px;
  line-height: 36px;
  margin-top: 16px;
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontsWeight.regular};
  color: ${p => p.theme.colors.secondary};
  text-align: center;

`;

const NavLink = styled(Link)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 32px;
  line-height: 48px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 16px;
  border-bottom: solid 2px ${p => p.theme.colors.grey};
  transition: all 0.25s var(--ease-in-out-quad);
  display: inline-block;

  &:hover {
    color: ${p => p.theme.colors.accent};
    border-color: ${p => p.theme.colors.accent};
  }
`;