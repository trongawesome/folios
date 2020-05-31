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
import animationData2 from '../asset-animation/animation.json';


const AboutPage: Template = ({ location, pageContext }) => {
  
  let animationContainer = createRef();
  let animationContainer2 = createRef();
  let anim = null;

  useEffect(() => {
    anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData
    });

    const anim2 = lottie.loadAnimation({
      container: animationContainer2.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData2
    });

    return () => anim.destroy(); // optional clean up for unmounting
  }, []);

  function handleStop() {
    anim.pause();
  }
  function handleStart() {
    anim.play();
  }

  return (
    <Layout>
      <SEO title={"Test Lottie Animation"}/>
      <Section narrow >
        <HeadingContainer>
          <div onMouseEnter={handleStop} onMouseLeave={handleStart}>
            <HeroHeading> Hover me </HeroHeading>
            To pause the animation
          </div>
          <AnimationContainer ref={animationContainer}></AnimationContainer>
        </HeadingContainer>
      </Section>
    </Layout>
  );
};

export default AboutPage;

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

const AnimationContainer = styled.div`
  position: relative;
`;
