import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Section from '@components/Section';
import Headings from "@components/Headings";
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from './Articles.List.Context';
import NavCategory from '@components/Navigation/Navigation.Categories';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              portfoliosHeading
              portfoliosSubtitle
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

  return (
    <Section narrow id="Articles__Hero">
      <HeadingContainer>
        <TextWrap style={{ maxWidth: `${hero.maxWidth}px` }}>
          <Headings.h1 dangerouslySetInnerHTML={{ __html: hero.portfoliosHeading }} />
          <InfoText>
            {hero.portfoliosSubtitle}
          </InfoText>
        </TextWrap>
        <NavCategory/>
      </HeadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const TextWrap = styled.div`

`;

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

const Anchor = styled(Link)`
  color: ${p => p.theme.colors.secondary};
  border-bottom: 1px solid ${p => p.theme.colors.secondary};
  margin-left: 6px;

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }
`;
