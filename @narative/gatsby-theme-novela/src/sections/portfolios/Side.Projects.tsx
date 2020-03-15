import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from "gatsby";

import Image from '@components/Image';
import mediaqueries from '@styles/media';

const siteQuery = graphql`
{
  allProjectsYaml {
    edges {
      node {
        external
        title
        url
        image {
          childImageSharp {
            fluid(maxWidth: 360, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`;

const SideProjects: React.FC<{}> = () => {

  const result = useStaticQuery(siteQuery).allProjectsYaml.edges;

  return (
    <GridWrapper>
      {result.map((project, index) =>(
        project.node.external ?
        (
          <ProjectLinkExternal href={project.node.url} data-a11y="false" key={index} >
              <ImageWrap>
                <Image
                  src={project.node.image.childImageSharp.fluid}
                  atl={project.node.title}
                />
              </ImageWrap>
          </ProjectLinkExternal>
        )
        :
        (
          <ProjectLink to={project.node.url} data-a11y="false" key={index} >
              <ImageWrap>
                <Image
                  src={project.node.image.childImageSharp.fluid}
                  atl={project.node.title}
                />
              </ImageWrap>
          </ProjectLink>
        )
      ))
      }
    </GridWrapper>
  );
};

export default SideProjects;

const GridWrapper = styled.div`
  position: relative;
  display: grid;
  z-index: 1;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 16px;
  margin-bottom: 64px;
  margin-top: 64px;
  
  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 40px;
  `}
`;

const cardLink = p => css`
  position: relative;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &::after, &::before {
    background: none repeat scroll 0 0 transparent;
    content: "";
    display: block;
    height: 4px;
    left: 50%;
    position: absolute;
    background: ${p.theme.colors.secondary};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
    z-index: 1;
  }

  ::after {
    top: -1px;
  }

  &:hover {
    &::after {
      width: 100%; 
      left: 0; 
    }
  }

`;

const ProjectLink = styled(Link)`
  ${cardLink};
`;

const ProjectLinkExternal = styled.a`
  ${cardLink};
`;

const ImageWrap = styled.div`

`;
