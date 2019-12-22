import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Progress from "@components/Progress";
import Section from "@components/Section";

import mediaqueries from "@styles/media";

import PortfolioHero from "../sections/portfolio/Portfolio.Hero";
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
      <PortfolioHero article={reading} authors={authors} />
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
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}
  
  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;
