import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

import Image, { ImagePlaceholder } from '@components/Image';
import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";

const siteQuery = graphql`
{
  allPartnersYaml {
    edges {
      node {
        title
        desc
        url
        image
      }
    }
  }
  allSite {
    edges {
      node {
        siteMetadata {
          hero {
            partnersHeading
          }
        }
      }
    }
  }
}
`;

const Page = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const { edges } = result.allPartnersYaml;

  return (
    <div>
      {edges.map((item, index) => (
          <div key={index}>
            <Title>
              {item.node.title}
            </Title>
            <ImageContainer>
              <Image 
                src={item.node.image} 
                alt={item.node.title}
                imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }} />
            </ImageContainer>
          </div>
        ))
      }
    </div>
  );
};

export default Page;

const List = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  ${mediaqueries.phablet`
    grid-template-columns: 1fr;
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  height: 800px;
  margin-bottom: 8px;
  transition: all 0.25s var(--ease-out-quad);
  border-radius: 12px;
  border: 1px solid ${p => p.theme.colors.card};
  overflow: hidden;

  & > div {
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 4px);
    opacity: 0;
    transition: all 0.25s var(--ease-out-quad);
    box-shadow: 0 30px 40px -20px rgba(119, 90, 67, 0.18),
      0 30px 30px -30px rgba(119, 90, 67, 0.4);
  }

  ${mediaqueries.tablet`
    height: 700px;
    overflow: hidden;
    margin-bottom: 0;
    border-radius: 0;
    border: 0;
  `}
`;

const Title = styled.h2`
  font-size:28px;
  line-height: 32px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};
  transition: color 0.3s ease-in-out;
  margin-bottom: 8px;
  // ${limitToTwoLines}

  ${mediaqueries.desktop`
    margin-bottom: 16px;
    font-size: 24px;
    line-height: 28px;
  `}
`;
