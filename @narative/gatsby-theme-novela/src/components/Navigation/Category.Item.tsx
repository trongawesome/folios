import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { LinkInternal } from "@components/LinkNav";

import mediaqueries from '@styles/media';

const CategoryItem = ({name, slug}) => {

  return (
    <CatLink to={slug} title={name} data-a11y="false">
      {name}
    </CatLink>
  );
};

export default CategoryItem;

const CatLink = styled(Link)`
  font-size: 16px;
  line-height: 40px;
  color: ${p => p.theme.colors.secondary};
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  margin-right: 12px;
  margin-bottom: 12px;
  display: inline-block;
  padding: 0 20px;
  background-color: ${p => p.theme.colors.card};
  border-radius: 20px;
  transition: all .3s var(--bounce);
  
  ${mediaqueries.tablet`
    margin-right: 8px;
    margin-bottom: 8px;
  `}

  &:hover {
    box-shadow: 0 0 0 1px ${p => p.theme.colors.primary}, 0 4px 0 0 ${p => p.theme.colors.primary};
    transform: translateY(-4px);
  }

`;