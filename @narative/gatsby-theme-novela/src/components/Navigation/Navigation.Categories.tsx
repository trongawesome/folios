import React from 'react';
import styled from '@emotion/styled';
import { Link, graphql, useStaticQuery } from "gatsby";

import mediaqueries from '@styles/media';
import CategoryItem from './Category.Item'

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
          <CategoryItem category={category} key={index} />
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
  align-items: center;
`;
