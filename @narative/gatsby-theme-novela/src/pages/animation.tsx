import React, { createRef, useEffect } from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Image from '@components/Image';
import Layout from "@components/Layout";
import { Template } from "@types";
import { graphql, useStaticQuery } from "gatsby";
import lottie from 'lottie-web';

import animationData from '../asset-animation/city.json';


const AboutPage: Template = ({ location, pageContext }) => {
  
  let animationContainer = createRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, []);
  
  return (
    <Layout>
      <SEO pathname={location.pathname} title={"About me"}/>
      <Section narrow >
        <HeadingContainer>
          <HeroHeading ref={animationContainer}></HeroHeading>
        </HeadingContainer>
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
  margin: 100px 0 76px;
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
  font-size: 108px;
  line-height: 1;
  max-width: 600px;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 64px
  `}

  ${mediaqueries.phablet`
    font-size: 60px;
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