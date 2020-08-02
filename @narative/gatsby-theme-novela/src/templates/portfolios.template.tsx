import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import PortfoliosHero from "../sections/portfolios/Portfolios.Hero";
import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import PortfolioList from "../sections/portfolios/Portfolios.List";

import { Template } from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            description
            hero {
              blogHeading
              blogSubtitle
            }
          }
        }
      }
    }
  }
`;

const PortfoliosPage: Template = ({ location, pageContext }) => {
  const portfolio = pageContext.group;
  const authors = pageContext.additionalContext.authors;

  const results = useStaticQuery(siteQuery);
  const site = results.allSite.edges[0].node.siteMetadata;
  const desc = results.allSite.edges[0].node.siteMetadata.blogSubtitle;

  return (
    <Layout>
      <SEO
        pathname={location.pathname}
        title={site.hero.blogHeading + " - " + site.name}
        description={site.hero.blogSubtitle}
      />
      <PortfoliosHero authors={authors} />
      <Section narrow>
        <PortfolioList articles={portfolio} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
    </Layout>
  );
};

export default PortfoliosPage;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 64px;`}
`;
