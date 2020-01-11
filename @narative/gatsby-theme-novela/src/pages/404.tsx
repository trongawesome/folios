import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";

import Icons from "@icons";
import { Template } from "@types";

const ArticlesPage: Template = ({ location, pageContext }) => {

  return (
    <Layout>
      <SEO pathname={location.pathname} title={"Page not found"} />
      <Section>
        <ImageWrapper>
          <Icons.NotFound />
          <Heading>Page not found</Heading>
          <Subheading>The link you clicked may be broken or the project hasn't been completed yet :D</Subheading>
        </ImageWrapper>
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default ArticlesPage;

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

const ImageWrapper = styled.div`
  position: relative;
  margin: 160px auto 250px auto;
  max-width: 408px;
  height: 192px;
  z-index: 1;

  ${mediaqueries.phablet`
    margin-bottom: 160px;
  `}

  svg {
    fill: ${p => p.theme.colors.secondary};
  }
`;

const Heading = styled.h1`
  font-size: 16px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.secondary};
  opacity: .5;
  margin-bottom: 15px;
  font-weight: ${p => p.theme.fontsWeight.bold};
  text-align: center;
  margin-top: 24px;

  ${mediaqueries.tablet`
  `}

  ${mediaqueries.phablet`
  `}
`;

const Subheading = styled.p`
  margin: 48px auto;
  max-width: 450px;
  color: ${p => p.theme.colors.grey};
  font-size: 16px;
  font-family: ${p => p.theme.fonts.body};
  line-height: 1.4;
  text-align: center;

  ${mediaqueries.phablet`
    font-size: 14px;
  `}
`;
