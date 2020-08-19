import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import Headings from "@components/Headings";
import { LinkInternal } from "@components/LinkNav";
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

  return (
    <Section narrow id="Articles__Hero">
      <HeadingContainer>
        <NavLink to={`/`} title={`All portfolios `} activeClassName="active" >
          All portfolios 
        </NavLink>
        <Headings.h1>{category.name + " Porfolios"}</Headings.h1>
        <InfoText>
          {category.bio}
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

const InfoText = styled.h3`
  font-size: 22px;
  line-height: 36px;
  margin-top: 16px;
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontsWeight.regular};
  color: ${p => p.theme.colors.secondary};
`;

const NavLink = styled(LinkInternal)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 32px;
  line-height: 48px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 16px;
  display: inline-block;
  box-shadow: inset 0 -2px 0 ${p => p.theme.colors.grey}

`;