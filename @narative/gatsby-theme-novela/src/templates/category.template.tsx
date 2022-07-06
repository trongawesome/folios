import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import Section from '@components/Section';
import SEO from '@components/SEO';
import Layout from '@components/Layout';
import Paginator from '@components/Navigation/Navigation.Paginator';

import ArticlesList from "../sections/articles/Articles.List";
import CategoryHero from "../sections/category/Category.Hero";

import { Template } from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            title
            hero {
              maxWidth
            }
          }
        }
      }
    }
  }
`;
const CategoryPage: Template = ({ location, pageContext }) => {
    // const { group: articles, category } = pageContext;
    // const authors = pageContext.additionalContext.authors;

    const results = useStaticQuery(siteQuery);
    const title = results.allSite.edges[0].node.siteMetadata.title;
    const maxWidth = results.allSite.edges[0].node.siteMetadata.hero.maxWidth;
    
    const author = pageContext.additionalContext.author;
    const articles = pageContext.group;
    const roundLength = articles.length > 10 ? Math.round(articles.length / 10) * 10 : articles.length;
    const roundLengthToSring = articles.length > 10 ? roundLength * pageContext.pageCount + "+" : roundLength;
  
    return (
      <Layout>
        <SEO pathname={location.pathname} title={roundLengthToSring + " best design portfolio examples for " + author.name + " - " + title} />
        <CategoryHero category={author} maxWidth={maxWidth} counter={roundLengthToSring}/>
        <ArticlesList articles={articles} />
        <Section narrow>
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
