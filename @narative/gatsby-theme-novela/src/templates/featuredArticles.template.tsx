import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import FeaturedArticlesHero from "../sections/articles/Featured.Articles.Hero";
import ArticlesList from "../sections/articles/Articles.List";

import { Template } from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            title
            hero {
              featuredArticlesHeading
              featuredArticlesSubtitle
            }
          }
        }
      }
    }
  }
`;

const FeaturedArticlesPage: Template = ({ location, pageContext }) => {
  // const articles = pageContext.group;
  const { group: articles, category } = pageContext;
  const authors = pageContext.additionalContext.authors;

  const results = useStaticQuery(siteQuery);
  const site = results.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>
      <SEO 
        pathname={location.pathname}
        title={site.hero.featuredArticlesHeading + " - " + site.title}
        description={site.hero.featuredArticlesSubtitle}
      />
      <FeaturedArticlesHero />
      <Section narrow>
        <ArticlesList articles={articles} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
    </Layout>
  );
};

export default FeaturedArticlesPage;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 64px;`}
`;
