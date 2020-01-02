import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import mediaqueries from '@styles/media';

interface HeroProps {
    heading: string;
    subtitle: string;
    maxWidth: string;
  }

const dataQuery = graphql`
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

const PageHero: React.FC<HeroProps> = ({ heading, subtitle, maxWidth }) => {

  return (
    <Section narrow>
      <HeadingContainer style={{ maxWidth: `${maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: heading }} />
        <InfoText>
          {subtitle}
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default PageHero;

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
    font-size: 44px;
  `}
`;

const InfoText = styled.p`
  font-size: 20px;
  margin-top: 24px;
  line-height: 1.8;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.phablet`
    font-size:18px;
  `}
`;

