import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Image from '@components/Image';
import Layout from "@components/Layout";
import { Template } from "@types";


import React, { createRef, useEffect } from "react";
import lottie from 'lottie-web';

import animationData from '../asset-animation/city.json';

const Lottie = () => {
  
  let animationContainer = createRef();
  let anim = null;

  useEffect(() => {
    anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: animationData
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
      <SEO pathname={location.pathname} title={"About me"}/>
      <Section narrow >
        <HeadingContainer>
          <div onMouseEnter={handleStart} onMouseLeave={handleStop}>
            Hover me to trigger animation
            <HeroHeading ref={animationContainer}></HeroHeading>
          </div>
        </HeadingContainer>
      </Section>
    </Layout>
  );
};

export default Lottie;

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
