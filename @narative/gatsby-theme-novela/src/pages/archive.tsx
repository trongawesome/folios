import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import mediaqueries from "@styles/media";
import { Link } from 'gatsby';

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import ArticlesGradient from "@components/ArticlesGradient";
import PageHero from "../sections/others";

const seoImage = '/trongnguyen.co-seo-little-big-grid.jpg';

const siteQuery = graphql`
{
  allArticle(sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        date(formatString: "DD MMMM YYYY")
        slug
      }
    }
    totalCount
  }
  allSite {
    edges {
      node {
        siteMetadata {
          description
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

const Archive = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const siteSEO = result.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>
      <SEO
        pathname={location.pathname} 
        title={"Archives - " + siteSEO.title}
        description={siteSEO.description}
        image={seoImage}
      />
      <PageHero
        heading="Archives"
        subtitle={result.allArticle.totalCount + " articles."}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <Wrapper>
          {result.allArticle.edges.map((item, index) => (
            <ArticlesItem to={item.node.slug} data-a11y="false" key={index}>
              <Date>{item.node.date}</Date>
              <Title>{item.node.title}</Title>
            </ArticlesItem>
          ))}
        </Wrapper>
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default Archive;

const ArticlesItem = styled(Link)`
  z-index: 1;
  position: relative;
  display: grid;
  grid-template-columns: 160px 1fr;
  // grid-template-columns: 1fr;
  column-gap: 16px;
  margin-bottom: 24px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 40px;
  `};
`;

const Date = styled.div`
  font-size: 16px;
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 4px;
  padding-top: 3px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};
`;

const Wrapper = styled.div`
  margin-bottom: 240px;
`;