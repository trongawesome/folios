import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import mediaqueries from '@styles/media';
import { Link } from 'gatsby';

import Image, { ImagePlaceholder } from '@components/Image';
import Headings from '@components/Headings';

const siteQuery = graphql`
{
  allPartnersYaml {
    edges {
      node {
        title
        desc
        url
        image {
          childImageSharp {
            fluid(maxWidth: 400, quality: 90) {
              ...GatsbyImageSharpFluid
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
            partnersHeading
          }
        }
      }
    }
  }
}
`;

const Partners = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const { edges } = result.allPartnersYaml;
  const sectionTitle = result.allSite.edges[0].node.siteMetadata.hero.partnersHeading;

  return (
    <PartnersWrap>
      <Title>
        {sectionTitle}
      </Title>
      <PartnersList>
        {edges.map((item, index) => (
            <ListItem to={item.node.url} data-a11y="false" key={index}>
              <MetaData>
                {item.node.title} — {item.node.desc}
              </MetaData>
              <ImageContainer>
                <Image 
                  src={item.node.image.childImageSharp.fluid} 
                  alt={item.node.title}
                  imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }} />
              </ImageContainer>
            </ListItem>
          ))
        }
      </PartnersList>
    </PartnersWrap>
  );
};

export default Partners;

const limitToOneLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
`;

const PartnersWrap = styled.div`
  grid-column: 1/span last;
`;

const PartnersList = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 48px;

  ${mediaqueries.desktop`
    grid-gap: 32px;
  `}

  ${mediaqueries.tablet`
    grid-gap: 16px;
  `}

  ${mediaqueries.phablet`
    grid-template-columns: 1fr;
    row-gap: 36px;
  `}
`;

const ListItem = styled(Link)`

`;


const ImageContainer = styled.div`
  position: relative;
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
    overflow: hidden;
    margin-bottom: 0;
    border-radius: 0;
    border: 0;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 44px;
  line-height: 56px;
  font-family: ${p => p.theme.fonts.title};
  letter-spacing: -1px;
  transition: color 0.3s ease-in-out;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 32px;

  ${mediaqueries.tablet`
    font-size: 38px;
    line-height: 48px;
  `}

  ${mediaqueries.tablet`
    padding: 0 16px;
  `}

`;

const MetaData = styled(Headings.h6)`
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  font-size: 16px;
  margin-bottom: 24px;
  ${limitToOneLines};
  
  ${mediaqueries.tablet`
    padding: 0 16px;
    font-size: 16px;
  `}
`;
