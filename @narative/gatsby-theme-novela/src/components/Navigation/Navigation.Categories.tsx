import React from 'react';
import styled from '@emotion/styled';
import { Link, graphql, useStaticQuery } from "gatsby";

import mediaqueries from '@styles/media';

const siteQuery = graphql`
{
  allCategoriesYaml {
    edges {
      node {
        name
        url
      }
    }
  }
}
`;

const NavCategory = ({ }) => {
  
  const result = useStaticQuery(siteQuery).allCategoriesYaml.edges;

  return (
    <NavContainer>
      <NavControls>
        {result.map((category, index) => (
          <NavLink to={category.node.url} title={category.node.name} data-a11y="false" key={index}>
            {category.node.name}
          </NavLink>
        ))}
      </NavControls>
    </NavContainer>
  );
};

export default NavCategory;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 40px;
  padding-top: 16px;
`;

const NavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`;

const NavLink = styled(Link)`
  font-family: ${p => p.theme.fonts.text};
  font-size: 18px;
  line-height: 32px;
  color: ${p => p.theme.colors.secondary};
  background-color: ${p => p.theme.colors.greyLight};
  transition: all 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  padding: 4px 16px;
  border-radius: 4px;
  margin-right: 16px;

  &:hover {
    color: ${p => p.theme.colors.primary};
    background-color: ${p => p.theme.colors.grey};
  }
`;

const Hero = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  margin: 35px auto 110px;
`;

const Heading = styled.h1`
  font-size: 38px;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: ${p => p.theme.fontsWeight.bold};
  text-transform: capitalize;
  
  ${mediaqueries.tablet`

  `}
`;
