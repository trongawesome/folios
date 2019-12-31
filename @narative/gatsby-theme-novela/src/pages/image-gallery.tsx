import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Image from '@components/Image';
import Layout from "@components/Layout";
import ArticlesGradient from "@components/ArticlesGradient";
import { graphql, useStaticQuery } from "gatsby";

import { Template } from "@types";

const siteQuery = graphql`
{
  allImageGalleryYaml {
    edges {
      node {
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`;

const AboutPage: Template = ({ location, pageContext }) => {
  
  const result = useStaticQuery(siteQuery);
  const images = result.allImageGalleryYaml.edges;
  
  return (
    <Layout>
      <SEO pathname={location.pathname} title={"Image Gallery"}/>

      <ImageGrid>
        { images.map(node => {
          <ImageItem key={node.title}>
            <Image src={node.image.childImageSharp.fluid} />
          </ImageItem>
        })}
      </ImageGrid>

      <ArticlesGradient />
    </Layout>
  );
};

export default AboutPage;

const ImageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(50px, auto);
`;

const ImageItem = styled.div`

  &::nth-child(5n){
    grid-column-end: span 2;
  }

  img {
    display: flex;
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
  
`;
