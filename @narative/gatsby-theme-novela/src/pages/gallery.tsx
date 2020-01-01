import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Gallery from "@components/Gallery";
import ArticlesGradient from "@components/ArticlesGradient";
import ArticlesHero from "../sections/articles/Articles.Hero";

const siteQuery = graphql`
{
  allImageGalleryYaml {
    edges {
      node {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
              src
            }
            original {
              src
            }
          }
        }
      }
    }
  }
}
`;

const ImageGallery = ({ location }) => {

  const result = useStaticQuery(siteQuery);

  return (
    <Layout>
      <SEO pathname={location.pathname} title={"My Moodboard"}/>
      <ArticlesHero />
      <Section narrow>
        <Gallery data={result} />
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default ImageGallery;
