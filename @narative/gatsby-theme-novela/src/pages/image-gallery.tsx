import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Gallery from "@components/Gallery";
import ArticlesGradient from "@components/ArticlesGradient";

import ArticlesHero from "../sections/articles/Articles.Hero";

import { Template } from "@types";

const ImageGallery: Template = ({ location }) => {
  
  return (
    <Layout>
      <SEO pathname={location.pathname} title={"Image Gallery"}/>
      <ArticlesHero />
      <Section>
        <Gallery />
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default ImageGallery;

