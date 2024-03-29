import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import mediaqueries from '@styles/media';
import Icons from "@icons";

import Image from '@components/Image';

const CaseStudyCard = ({item, actionTitle}) => {
 
  return (
    <CardSingle>
      <ImageContainer>
        <Image
          src={item.node.image.childImageSharp.fluid}
          alt={item.node.title}
          imgStyle={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </ImageContainer>
      <TextWrap>
        <Type> {item.node.type} </Type>
        <Title> {item.node.title} </Title>
        <Desc> {item.node.desc} </Desc>
        <LinkButton href={item.node.url + "?ref=pafolios"} data-a11y="false" target="_blank" rel="noopener">{actionTitle}<Icons.ArrowExternal />
        </LinkButton>
        </TextWrap>
    </CardSingle>
  );
};

export default CaseStudyCard;

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
`;

const CardSingle = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 192px 1fr;
  column-gap: 24px;
  background: ${p => p.theme.colors.card};
  transition: transform 0.3s var(--ease-out-quart);
  
  ${mediaqueries.desktop`
    grid-template-columns: 1fr;
    align-items: start;
  `}

  `;
  
const ImageContainer = styled.div`
  position: relative;
  height: 280px;

  & > div {
    height: 100%;
  }

  ${mediaqueries.desktop`
    height: 220px;
  `}

`;

const TextWrap = styled.div`
  position: relative;
  padding: 8px 24px 8px 0;
  align-self: start;

  ${mediaqueries.desktop`
    padding: 16px 24px 32px;
  `}

  ${mediaqueries.tablet`
    
  `}
`;

const Title = styled.h2`
  font-size:28px;
  line-height: 32px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};
  transition: color 0.3s ease-in-out;
  margin-bottom: 8px;
  ${limitToTwoLines}

  ${mediaqueries.desktop`
    margin-bottom: 16px;
    font-size: 24px;
    line-height: 28px;
  `}
`;

const Desc = styled.p`
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 16px;
  font-size: 18px;
  ${limitToTwoLines}
  -webkit-line-clamp: 3;
`;

const Type = styled.p`
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};

  font-size: 14px;
  line-height: 24px;
  margin-top: 8px;
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 4px;
  text-transform: uppercase;

`;
const LinkButton = styled.a`
  position: relative;
  font-size: 16px;
  line-height: 32px;
  // margin-top: 24px;
  color: ${p => p.theme.colors.primary};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.secondary};
  padding: 4px 16px;
  transition: all 0.3s var(--ease-out-quad);
  border-radius: 4px;

  &:hover {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.background};
    box-shadow: inset 0px 0px 0px 1px ${p => p.theme.colors.primary};
  }

  svg {
    margin-left: 4px;  
  }

  &:hover svg path {
    transition: all 0.3s var(--ease-out-quad);
    fill: ${p => p.theme.colors.background};
  }
`;
