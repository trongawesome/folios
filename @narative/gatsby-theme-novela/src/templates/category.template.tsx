import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import Section from '@components/Section';
import SEO from '@components/SEO';
import Layout from '@components/Layout';
import Paginator from '@components/Navigation/Navigation.Paginator';

import ArticlesList from "../sections/articles/Articles.List";
import CategoryHero from "../sections/category/Category.Hero";

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
        <SEO pathname={location.pathname} title={"Awesome Portfolios from " + category + " - " + title} />
        <CategoryHero category={category} />
        <Section narrow>
          <ArticlesList articles={articles} />
          <ArticlesPaginator show={pageContext.pageCount > 1}>
            <Paginator {...pageContext} />
          </ArticlesPaginator>
        </Section>
      </Layout>
    );
  }

export default CategoryPage;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 64px;`}
`;
