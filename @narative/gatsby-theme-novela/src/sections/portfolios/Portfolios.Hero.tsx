import React, { useContext } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Section from '@components/Section';
import Headings from "@components/Headings";
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from '../articles/Articles.List.Context';
import PageHero from "../others/Page.Hero";

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              blogHeading
              blogSubtitle
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const PortfoliosHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const featuredAuthor = authors.find(author => author.featured);

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.Trong test ssh.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <PageHero
      heading={hero.blogHeading}
      subtitle={hero.blogSubtitle}
      maxWidth={hero.maxWidth}
    />
  );
};

export default PortfoliosHero;
