import React from 'react';
import styled from '@emotion/styled';
import { Link } from "gatsby";

import mediaqueries from '@styles/media';

const CategoryItem = ({category}) => {

  return (
    <NavLink to={category.node.url} title={category.node.name} data-a11y="false">
      {category.node.name}
    </NavLink>
  );
};

export default CategoryItem;

const NavLink = styled(Link)`
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-size: 18px;
  line-height: 32px;
  color: ${p => p.theme.colors.secondary};
  transition: all 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  border-bottom: 2px solid ${p => p.theme.colors.grey};
  margin-right: 24px;
  margin-bottom: 16px;

  &:hover {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.tablet`
    margin-right: 16px;
    margin-bottom: 16px;
  `}
`;
