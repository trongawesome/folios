import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";

import PageHero from "../sections/others/Page.Hero";
import CaseStudyCard from "../sections/articles/CaseStudy.Card";

const seoImage = '/preview-case-studies.jpg';
const actionTitle = 'Read case study';

const regex = /(<([^>]+)>)/ig; //remove html tag

const siteQuery = graphql`
{
  allCaseStudiesYaml {
    edges {
      node {
        title
        desc
        url
        type
        image {
          childImageSharp {
            fluid(maxWidth: 200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }

  allSite {
    edges {
      node {
        siteMetadata {
          hero {
            caseStudyHeading
            caseStudySubtitle
            maxWidth
          }
          title
        }
      }
    }
  }
}
`;

const Page = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const { edges } = result.allCaseStudiesYaml;
  const siteSEO = result.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>
      <SEO
        pathname={location.pathname} 
        title={siteSEO.hero.caseStudyHeading.replace(regex, '') + " - " + siteSEO.title}
        description={siteSEO.hero.caseStudySubtitle}
        image={seoImage}
      />

      <PageHero
        heading={siteSEO.hero.caseStudyHeading}
        subtitle={siteSEO.hero.caseStudySubtitle}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <List>
          {edges.map((item, index) => (
              <CaseStudyCard item={item} actionTitle={actionTitle} key={index}/>

            ))
          }
        </List>
      </Section>
    </Layout>
  );
};

export default Page;

const List = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  ${mediaqueries.phablet`
    grid-template-columns: 1fr;
  `}
`;