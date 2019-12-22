import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              readingHeading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ReadingsHero: React.FC<IAuthor> = ({ authors }) => {
  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;

  return (
    <Section relative id="Portfolios__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.readingHeading }} />
        <InfoText>
          My personal bookshelf on design and creativity. I figured out you might get some ideas for your next reading.
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default ReadingsHero;

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