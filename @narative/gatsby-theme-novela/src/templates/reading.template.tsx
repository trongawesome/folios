import React, { useRef } from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Section from "@components/Section";

import mediaqueries from "@styles/media";

import ReadingHero from "../sections/reading/Reading.Hero";
import ArticleSEO from "../sections/article/Article.SEO";

import { Template } from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`;

const ReadingBook: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;

  const { reading, authors} = pageContext;

  return (
    <Layout>
      <ArticleSEO article={reading} authors={authors} location={location} />
      <ReadingHero article={reading} />
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={reading.body}>
        </MDXRenderer>
      </ArticleBody>
    </Layout>
  );
};

export default ReadingBook;

const ArticleBody = styled.article`
  position: relative;
  padding: 56px 0 35px;
  transition: background 0.2s linear;
  
  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`;

