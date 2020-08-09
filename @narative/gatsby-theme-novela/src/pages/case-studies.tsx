import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import ArticlesGradient from "@components/ArticlesGradient";

import PageHero from "../sections/others/Page.Hero";
import CaseStudyCard from "../sections/articles/CaseStudy.Card";

const seoImage = '/preview-figma-files.jpg';
const actionTitle = 'View this file';

const regex = /(<([^>]+)>)/ig; //remove html tag

const siteQuery = graphql`
{
  allCaseStudiesYaml {
    edges {
      node {
        title
        desc
        url
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    totalCount
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
  const data = result.allCaseStudiesYaml;
  const siteSEO = result.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>
      <SEO
        pathname={location.pathname} 
        title={siteSEO.hero.caseStudyHeading.replace(regex, '')}
        description={siteSEO.hero.caseStudySubtitle}
        image={seoImage}
      />

      <PageHero
        heading={siteSEO.hero.caseStudyHeading}
        subtitle={siteSEO.hero.caseStudySubtitle}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <CaseStudyCard data={data} actionTitle={actionTitle}/>
      </Section>
    </Layout>
  );
};

export default Page;
