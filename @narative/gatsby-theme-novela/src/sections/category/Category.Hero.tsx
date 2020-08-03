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
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const CategoryHero: React.FC<IAuthor> = ({ category }) => {
  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;

  return (
    <Section narrow id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <NavLink to={`/`} title={`All portfolios `} activeClassName="active" >
          All portfolios 
        </NavLink>
        <Headings.h1>{category}</Headings.h1>
        <InfoText>
            Here is a short description for ProductDesigners. They have many names, but truely the same.
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default CategoryHero;

const HeadingContainer = styled.div`
  margin: 176px 0 112px;
  
  ${mediaqueries.desktop`
  width: 80%;
  `}
  
  ${mediaqueries.tablet`
  width: 100%;
  `}
  `;

const InfoText = styled.p`
  font-size: 22px;
  line-height: 36px;
  margin-top: 16px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
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