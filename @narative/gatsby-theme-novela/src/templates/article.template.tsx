import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Headings from '@components/Headings';

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import ArticleHero from "../sections/article/Article.Hero";
import ArticleSEO from "../sections/article/Article.SEO";
import ArticleRelated from "../sections/article/Article.Related";


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

const Article: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;

  const { article, authors, mailchimp, next } = pageContext;

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener("resize", calculateBodySize);

    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  return (
    <Layout>
      <ArticleSEO article={article} authors={authors} location={location} />
      <ArticleHero article={article} authors={authors} />
      {/* <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body}>
        </MDXRenderer>
      </ArticleBody> */}

      {next.length > 0 && (
        <NextArticle>
          <FooterNext>Similar to {article.title}</FooterNext>
          <ArticleRelated articles={next} />
        </NextArticle>
      )}

    </Layout>
  );
};

export default Article;

const NextArticle = styled.div`
  max-width: 1296px;
  padding: 0 48px;
  margin: 128px auto;

  ${mediaqueries.tablet`
    padding: 0;
  `}

`;

const FooterNext = styled(Headings.h5)`
  position: relative;
  opacity: 0.25;
  margin-bottom: 40px;
  padding-bottom: 8px;
  color: ${p => p.theme.colors.primary};
  border-bottom: solid 2px ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    padding-left: 16px;
  `}
`;

