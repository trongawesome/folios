import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Image from '@components/Image';
import Layout from "@components/Layout";
import { graphql, useStaticQuery } from "gatsby";

import { Template } from "@types";

const siteQuery = graphql`
{
  file(relativePath: {eq: "trong-avatar.jpg"}) {
    id
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;

const AboutPage: Template = ({ location, pageContext }) => {
  
  const avatarResult = useStaticQuery(siteQuery);
  
  return (
    <Layout>
      <SEO pathname={location.pathname} title={"About me"}/>
      <Section narrow >
        <HeadingContainer>
          <HeroHeading>Nice to meet you!</HeroHeading>
        </HeadingContainer>
      </Section>
      <Section narrow >
        <ContentContainer>
          <MyImage><Image src={avatarResult.file.childImageSharp.fluid} /></MyImage>
          <MyText>
            <InfoHeading>
              Born and raised in a small village in Viet Nam, been hard at work since 2015.
            </InfoHeading>
            <InfoText>
              Trong is a Singapore-Based Product Designer, currently building Carousell classified marketplace that inspires people to start to sell and buy.
            </InfoText>
            <InfoText>
              Previously, he built the e-commerce Leflair Viet Nam, an online retailer that focuses on beauty, fashion and home living products.
            </InfoText>
            <InfoText>
              He spent 5 years in a tech university to learn IT, but he soon realized design is his passion. He hated coding, but his gut told him to finish the engineering diploma while learning to design in his free time. And when he met the UX term, basic knowledge in IT became an important foundation in his career.
            </InfoText>
            <InfoText>
              One of the greatest things about being a designer with an engineering background is that not only he can take care of the graphical aspects of a project, but can also fully understand, participate and even take care of the technical aspects of those projects.
            </InfoText>
          </MyText>
        </ContentContainer>
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default AboutPage;

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const HeadingContainer = styled.div`
  margin: 100px 0;
  font-family: ${p => p.theme.fonts.title};

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled.h2`
  font-style: normal;
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-size: 100px;
  line-height: 1.1;
  max-width: 600px;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 64px
  `}

  ${mediaqueries.phablet`
    font-size: 44px;
  `}
`;

const ContentContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 64px;
  z-index: 1;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}
`;

const InfoHeading = styled.h1`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 32px;
  line-height: 1.35;
  max-width: 100%;
  margin-bottom: 32px;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-top: 24px;
  line-height: 1.7;
  color: ${p => p.theme.colors.primary};
`;

const MyText = styled.div`
  position: relative;
`;

const MyImage = styled.div`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 56px;
  
  .gatsby-image-wrapper {
    box-shadow: 0 22px 44px 0 rgba(0,0,0,0.22);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
`;