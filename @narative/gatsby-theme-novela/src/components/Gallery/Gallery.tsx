import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Image from '@components/Image';
import { ImageZoom } from "@components/Image";
import { graphql, useStaticQuery } from "gatsby";

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
            }
          }
        }
      }
    }
  }
}
`;

const Gallery = () => {
  
  const result = useStaticQuery(siteQuery);
  const { edges } = result.allImageGalleryYaml;

  return (
    <ImageGrid>
      {edges.map((item, index) => (
          <ImageItem key={index}>
            {/* <ImageZoom
              src={item.node.image.childImageSharp.fluid}
              alt={item.node.title}
             >
            </ImageZoom> */}
            <Image
              src={item.node.image.childImageSharp.fluid} alt={item.node.title}
              imgStyle={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </ImageItem>
        ))
      }
    </ImageGrid>
  );
};

export default Gallery;

const ImageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: minmax(50px, auto);
  z-index: 1;
  position: relative;
`;

const ImageItem = styled.div`

  &:nth-child(5n){
    grid-column-end: span 2;
  }

  & > div {
    height: 100%;
  }
`;
