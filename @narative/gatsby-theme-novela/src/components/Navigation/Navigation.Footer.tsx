import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";
import mediaqueries from "@styles/media";
import Subscription from "@components/Subscription";
import LinkExternal from "@components/LinkExternal";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            social {
              url
              name
            }
          }
        }
      }
    }
    allMdx(sort: {fields: frontmatter___date, order: ASC}) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`;

const Footer: React.FC<{}> = () => {
  const results = useStaticQuery(siteQuery);
  const { name, social } = results.allSite.edges[0].node.siteMetadata;

  const copyrightDate = (() => {
    const { edges } = results.allMdx;
    const years = [0, edges.length - 1].map((edge) =>
      new Date(edges[edge].node.frontmatter.date).getFullYear()
    );
    return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`;
  })();

  return (
    <Container>
      <Section narrow>
        <Subscription />
        <FooterContainer>
          <FooterText>
            © {copyrightDate} Trong Nguyen. Made in Singapore. Update daily.
          </FooterText>
          <FooterLink href="https://twitter.com/trongawesome" target="_blank"> Follow on Twitter </FooterLink>
          <FooterLink href="/rss.xml" target="_blank"> Portfolio of the Day RSS </FooterLink>
        </FooterContainer>
      </Section>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: ${p => p.theme.colors.black};
  text-align: center;
  font-size: 18px;
  padding: 80px 0;
  margin-top: 160px;

  ${mediaqueries.tablet`
    margin-top: 0;
  `}
`;

const FooterContainer = styled.div`
  position: relative;
  padding-bottom: 40px;
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.tablet`
    flex-direction: column;
    padding-bottom: 88px;
  `}

  ${mediaqueries.phablet`
    padding-bottom: 48px;
    padding-top: 0;
  `}
`;

const FooterText = styled.div`
  color: ${p => p.theme.colors.white};
  font-weight: ${p => p.theme.fontsWeight.bold};
  margin-bottom: 8px;
  ${mediaqueries.tablet`
    margin-bottom: 80px;
  `}

  ${mediaqueries.phablet`
    margin: 64px auto 24px;
    text-align: center;
  `}
`;

const FooterLink = styled.a`
  font-family: ${p => p.theme.fonts.body};
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 4px;
  color: ${p => p.theme.colors.grey};
  transition: color 0.25s var(--ease-in-out-quad);
  display: block;
  position: relative;

  &:hover {
    color: ${p => p.theme.colors.white};
  }
`;