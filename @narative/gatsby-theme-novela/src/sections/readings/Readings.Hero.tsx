import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Icons from "@icons";
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
    <Container>
      <Section relative>
        <HeadingContainer>
          <HeroHeading dangerouslySetInnerHTML={{ __html: hero.readingHeading }} />
          <InfoText>
            My personal bookshelf on design and creativity. I figured out you might get some ideas for your next reading.
          </InfoText>
        </HeadingContainer>
      </Section>
      <HeroImage>
        <Icons.Bookmark />
      </HeroImage>
    </Container>
  );
};

export default ReadingsHero;

const Container = styled.div`
  position: relative;
  height: 816px;
  overflow: hidden;
  margin-bottom: 80px;

  ${mediaqueries.tablet`
    height: 496px;
  `}

`;

const HeroImage = styled.div`
  position: absolute;
  right: -88px;
  top: -32px;
  display: flex;
  align-items: center;

  ${mediaqueries.desktop`
    top: 32px;
  `}

  ${mediaqueries.tablet`
    top: 100px;
  `}

  svg {
    width: 848px;
    height: auto;

    ${mediaqueries.desktop`
      width: 600px;
    `}

    ${mediaqueries.phablet`
      width: 500px;
    `}

    ${mediaqueries.tablet`
      width: 328px;
      opacity: .4;
    `}
  }
`;

const HeadingContainer = styled.div`
  margin: 100px 0;
  z-index: 1;
  position: absolute;
  bottom: 80px;
  max-width: 560px;
  padding-right: 40px;
  
  ${mediaqueries.desktop`
    max-width: 360px;
  `}
  
  ${mediaqueries.tablet`
    width: 100%;
    bottom: auto;
  `}
`;
  
const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 104px;
  line-height: 98%;
  letter-spacing: -1px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 80px
  `}

  ${mediaqueries.phablet`
    font-size: 64px;
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