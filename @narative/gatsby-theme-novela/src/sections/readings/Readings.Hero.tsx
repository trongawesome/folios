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
        fluid {
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
              My personal bookshelf on design and creativity. I figured out you might get some ideas for your next reading.
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
  overflow: hidden;
  margin-top: 56px;
  margin-bottom: 30px;
  background: ${p => p.theme.colors.card};

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
  margin: 40px 0 64px 64px;

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
  font-weight: 600;
  font-size: 94px;
  line-height: 98%;
  letter-spacing: -1px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.desktop`
    font-size: 56px
  `}

  ${mediaqueries.tablet`
    font-size: 48px;
  `}

  ${mediaqueries.phablet`
    font-size: 40px;
  `}
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-top: 24px;
  line-height: 1.8;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.tablet`
    font-size: 16px;
  `}

`;
