import React from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from "gatsby";

import CategoryItem from './Category.Item'

const siteQuery = graphql`
{
  allAuthor(limit: 10) {
    edges {
      node {
        name
        slug
      }
    }
  }
}
`;

const NavCategory = ({ }) => {
  
  const result = useStaticQuery(siteQuery).allAuthor.edges;

  return (
    <NavContainer>
      <NavControls>
        <CategoryItem name="We Choice ★" slug="/staff-picks" />
        {result.map((category, index) => (
          <CategoryItem name={category.node.name} slug={category.node.slug} key={index} />
        ))}
      </NavControls>
    </NavContainer>
  );
};

export default NavCategory;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  margin-bottom: 40px;
  padding-top: 16px;
  text-align: center;
`;

const NavControls = styled.div`
  position: relative;
  align-items: center;
`;
