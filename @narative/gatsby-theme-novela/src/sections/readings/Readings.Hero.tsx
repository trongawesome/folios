import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Image from '@components/Image';
import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const siteQuery = graphql`
  {
    file(relativePath: {eq: "reading-hero.png"}) {
      id
      childImageSharp {
        fluid(maxWidth: 640, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const ReadingsHero: React.FC<IAuthor> = ({ authors }) => {

  const heroImage = useStaticQuery(siteQuery);

  return (
    <Section narrow>
      <Container>
        <HeroTextContainer>
            <HeroHeading>Read to design better.</HeroHeading>
            <InfoText>
              My bookshelf on design and creativity. I figured out you might get some ideas for your next reading experience.
            </InfoText>
        </HeroTextContainer>
        <HeroImage>
          <Image
            src={heroImage.file.childImageSharp.fluid}
            imgStyle={{ objectFit: 'contain', objectPosition: 'bottom' }}
          />
        </HeroImage>
      </Container>
    </Section>
  );
};

export default ReadingsHero;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 600px;
  column-gap: 0;
  margin-top: 56px;
  
  ${mediaqueries.desktop`
    grid-template-columns: 1fr 416px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    background: none;
    margin-bottom: 0;
  `}

`;

const HeroTextContainer = styled.div`
  position: relative;
  align-self: end;
  margin: 24px 0 40px 0;
  align-self: center;

  ${mediaqueries.tablet`
    margin: 40px 0 0;
  `}
`;

const HeroImage = styled.div`
  position: relative;
  align-self: end;

  ${mediaqueries.tablet`
    margin-left: 32px;
    margin-right: 32px;
  `}

`;
  
const HeroHeading = styled.h1`
  font-style: normal;
  font-size: 94px;
  line-height: 98%;
  letter-spacing: -1px;
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.desktop`
    font-size: 56px
  `}

  ${mediaqueries.tablet`
    font-size: 48px;
  `}

  ${mediaqueries.phablet`
    font-size: 56px;
    line-height: 1.15;
  `}
`;

const InfoText = styled.p`
  font-size: 20px;
  margin-top: 24px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};

`;
