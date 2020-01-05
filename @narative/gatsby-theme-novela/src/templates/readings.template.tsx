import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import ReadingsHero from "../sections/readings/Readings.Hero";
import Section from "@components/Section";
import SEO from "@components/SEO";
// import Layout from "@components/Layout";
import { LayoutBase } from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import ReaddingsList from "../sections/readings/Readings.List";

import { Template } from "@types";

const seoImage = '/trongnguyen.co-seo-reading.jpg';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            hero {
              readingHeading
            }
            title
          }
        }
      }
    }
  }
`;

const ReadingsPage: Template = ({ location, pageContext }) => {
  const reading = pageContext.group;
  const authors = pageContext.additionalContext.authors;

  const results = useStaticQuery(siteQuery);
  const site = results.allSite.edges[0].node.siteMetadata;

  return (
    <LayoutBase>
      <SEO
        pathname={location.pathname}
        title={site.hero.readingHeading + " - " +  site.title}
        image={seoImage}
      />
      <ReadingsHero authors={authors} />
      <Section narrow>
        <ReaddingsList articles={reading} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
      <ArticlesGradient />
    </LayoutBase>
  );
};

export default ReadingsPage;

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

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 64px;`}
`;
