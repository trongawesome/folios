import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import Section from '@components/Section';
import SEO from '@components/SEO';
import Layout from '@components/Layout';
import Paginator from '@components/Navigation/Navigation.Paginator';
import NavCategory from '@components/Navigation/Navigation.Categories';

import ArticlesList from "../sections/articles/Articles.List";
import ArticlesHero from "../sections/articles/Articles.Hero";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            title
          }
        }
      }
    }
  }
`;

function CategoryPage({ location, pageContext }) {
    const { group: articles, category } = pageContext;
    const authors = pageContext.additionalContext.authors;

    const results = useStaticQuery(siteQuery);
    const title = results.allSite.edges[0].node.siteMetadata.title;
  
    return (
      <Layout>
        <SEO pathname={location.pathname} title={category + " | " + title} />
        <ArticlesHero authors={authors} />
        <Section narrow>
          <NavCategory category={category} />
          <ArticlesList articles={articles} />
          <ArticlesPaginator show={pageContext.pageCount > 1}>
            <Paginator {...pageContext} />
          </ArticlesPaginator>
        </Section>
        <ArticlesGradient />
      </Layout>
    );
  }

export default CategoryPage;

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
