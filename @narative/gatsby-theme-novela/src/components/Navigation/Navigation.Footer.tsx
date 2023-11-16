import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";

import mediaqueries from "@styles/media";
import Subscription from "@components/Subscription";
import { LinkExternal, LinkInternal } from "@components/LinkNav";

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
            © {copyrightDate}&nbsp;
            <LinkExternal href="https://trongnguyen.co" target="_blank" rel="noopener" >Trong Nguyen</LinkExternal>
            . Made in Singapore. Update daily.
          </FooterText>
          <HideDesktop>
            <LinkInternal to="/about" data-a11y="false" > About </LinkInternal>
          </HideDesktop>
          <FooterSpace>
            <LinkExternal href="https://twitter.com/pafolios" target="_blank" rel="noopener" > Follow on Twitter </LinkExternal>
          </FooterSpace>
          <FooterSpace>
            <LinkExternal href="/rss.xml" target="_blank"> Portfolio of the Day RSS </LinkExternal>
          </FooterSpace>
          <FooterSpace>
            <LinkExternal href="mailto:hi@pafolios.com" target="_blank" rel="noopener" > Submit your site: hi@pafolios.com </LinkExternal>
          </FooterSpace>
          <FooterNote>
            Search isn't available, yet. In the mean time, view a list of&nbsp;
            <LinkInternal to="/all-sites" data-a11y="false" > all portfolios </LinkInternal>
            .
          </FooterNote>
          <FooterNote>All screenshots © of their respective owners.</FooterNote>
        </FooterContainer>
      </Section>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: ${p => p.theme.colors.black};
  text-align: center;
  padding: 80px 0;
  margin-top: 160px;

  ${mediaqueries.tablet`
    margin-top: 120px;
  `}
`;

const FooterContainer = styled.div`
  position: relative;
  padding-bottom: 40px;
  font-size: 18px;
  line-height: 32px;
  color: ${p => p.theme.colors.grey};

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
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};
  margin-bottom: 8px;
  ${mediaqueries.tablet`
    margin-bottom: 80px;
  `}

  ${mediaqueries.phablet`
    margin: 64px auto 24px;
    text-align: center;
  `}

  a {
    box-shadow: inset 0 -2px 0 ${p => p.theme.colors.secondary}
  }
`;

const FooterSpace = styled.div`
  margin-bottom: 4px;
`;

const HideDesktop = styled.div`
  margin-bottom: 4px;
  display: none;

  ${mediaqueries.phablet`
    display: inline-block;
  `}
`;

const FooterNote = styled.div`
  font-size: 14px;
  line-height:24px;
  color: ${p => p.theme.colors.grey};
  opacity: .7;
  margin-top: 8px;
  
  a {
    box-shadow: inset 0 -2px 0 ${p => p.theme.colors.grey}
  }

`;