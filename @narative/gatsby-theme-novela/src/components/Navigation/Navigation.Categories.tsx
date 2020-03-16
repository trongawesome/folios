import React from 'react';
import styled from '@emotion/styled';
import { Link } from "gatsby";

import mediaqueries from '@styles/media';

const NavCategory = ({ category }) => {
  return (
    <NavContainer>
      <NavControls>
          <NavLink to={`/writing`} title={`All articles`} activeClassName="active" >
          All
          </NavLink>
          <NavLink to={`/categories/design`} title={`Design category`} activeClassName="active" >
          Design
          </NavLink>
          <NavLink to={`/categories/code`} title={`Code category`} activeClassName="active" >
          Code
          </NavLink>
          <NavLink to={`/categories/lavida`} title={`Lavida category`} activeClassName="active" >
          LaVida
          </NavLink>
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
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  margin-right: 40px;
  
  ${mediaqueries.phablet`
    margin-right: 32px;
  `}

  &::after {
    background: none repeat scroll 0 0 transparent;
    bottom: -8px;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${p => p.theme.colors.accent};
    transition: width 0.25s ease 0s, left 0.25s ease 0s;
    width: 0;
  }

  &:hover {
    color: ${p => p.theme.colors.primary};

    &::after {
      width: 100%; 
      left: 0; 
    }
  }

  &.active {
    color: ${p => p.theme.colors.primary};

    &::after {
      background: none repeat scroll 0 0 transparent;
      bottom: -8px;
      content: "";
      display: block;
      height: 2px;
      left: calc(50% - 8px);
      position: absolute;
      background: ${p => p.theme.colors.accent};
      transition: width 0.25s ease 0s, left 0.25s ease 0s;
      width: 16px;
    }
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
  ${mediaqueries.phablet`
  `}
`;
