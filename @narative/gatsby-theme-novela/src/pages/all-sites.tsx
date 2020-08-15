import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import mediaqueries from "@styles/media";
import { Link } from 'gatsby';

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import { LinkInternal } from "@components/LinkNav";
import PageHero from "../sections/others";


const seoImage = '/trongnguyen.co-seo-little-big-grid.jpg';

const siteQuery = graphql`
{
  allArticle(sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        date(formatString: "DD MMM YYYY")
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
  const siteSEO = result.allSite.edges[0].node.siteMetadata

  return (
    <Layout>
      <SEO
        pathname={location.pathname} 
        title={"All portfolios on Pafolio - " + siteSEO.title}
        description={siteSEO.description}
        image={seoImage}
      />
      <PageHero
        heading="All portfolios on Pafolios"
        subtitle={result.allArticle.totalCount + " awesome portfolios."}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <List reversed="reversed">
          {result.allArticle.edges.map((item, index) => (
              <Item key={index}>
                {item.node.date + " — "} 
                <LinkInternal to={item.node.slug} data-a11y="false">{item.node.title}</LinkInternal>
              </Item>
            ))}
        </List>
        <Background>
          <Heading>Index</Heading>
        </Background>
      </Section>
    </Layout>
  );
};

export default Archive;

const List = styled.ol`
  font-size:20px;
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  margin-left: 48px;
  z-index: 1;
  position: relative;
`;

const Item = styled.li`
  padding: 12px 0;

  a {
    color: ${p => p.theme.colors.primary};
    box-shadow: inset 0 -2px 0 ${p => p.theme.colors.track}
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

const Heading = styled.h2`
  font-size: 48vw;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.body};
  transform: rotate(-7deg) translateX(-6vw) translateY(35vh);
  letter-spacing: -53px;
  font-weight: ${p => p.theme.fontsWeight.bold};

  ${mediaqueries.tablet`
    font-size: 285px;
    letter-spacing: -28px;
    transform: rotate(-12deg) translateX(-144px) translateY(calc(100% - -141px));
  `}
`;