import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Gallery from "@components/Gallery";
import ArticlesGradient from "@components/ArticlesGradient";
import ArticlesHero from "../sections/articles/Articles.Hero";
import PageHero from "../sections/others";

const seoImage = '/seo-readings.jpg';

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
  allSite {
    edges {
      node {
        siteMetadata {
          hero {
            littleGalleryHeading
            littleGallerySubtitle
            maxWidth
          }
          title
        }
      }
    }
  }
}
`;

const ImageGallery = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const images = result.allImageGalleryYaml;
  const siteSEO = result.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>
      <SEO
        pathname={location.pathname} 
        title={siteSEO.hero.littleGalleryHeading + " - " + siteSEO.title}
        description={siteSEO.hero.littleGallerySubtitle}
        image={seoImage}
      />
      <PageHero
        heading={siteSEO.hero.littleGalleryHeading}
        subtitle={siteSEO.hero.littleGallerySubtitle}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <Gallery data={images} />
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default ImageGallery;
