import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { LinkInternal } from "@components/LinkNav";

import mediaqueries from '@styles/media';

const CategoryItem = ({name, slug}) => {

  return (
    <LinkWrap>
      <CatLink to={slug} title={name} data-a11y="false">
        {name}
      </CatLink>
    </LinkWrap>
  );
};

export default CategoryItem;

const LinkWrap = styled.span`

`; 

const CatLink = styled(Link)`
  font-size: 18px;
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
  transition: background 0.25s var(--ease-in-out-quad);
  
  ${mediaqueries.tablet`
    margin-right: 8px;
    margin-bottom: 8px;
  `}

  &:hover {
    background-color: ${p => p.theme.colors.accent};
  }

`;