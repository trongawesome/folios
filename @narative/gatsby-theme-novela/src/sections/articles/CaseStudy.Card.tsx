import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import mediaqueries from '@styles/media';

import Headings from '@components/Headings';
import Image from '@components/Image';

const CaseStudyCard = ({data, actionTitle}) => {

  const { edges } = data;
 
  return (
    <Wrap>
      {edges.map((item, index) => (
          <CardLink key={index} href={item.node.url} data-a11y="false" target="_blank">
              <CardSingle>
                <ImageContainer>
                  <Image
                    src={item.node.image.childImageSharp.fluid}
                    alt={item.node.title}
                    imgStyle={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </ImageContainer>
                <TextWrap>
                  <Title>
                    {item.node.title}
                  </Title>
                  <Desc>
                    {item.node.desc}
                  </Desc>
                  <ButtonLink>{actionTitle}</ButtonLink>
                  </TextWrap>
              </CardSingle>
          </CardLink>
        ))
      }
    </Wrap>
  );
};

export default CaseStudyCard;

const Wrap = styled.div`
  position: relative;
  margin-top: 80px;
`;

const CardLink  = styled.a`
  position: relative;
  display: block;
  width: 100%;
`;


const CardSingle = styled.div`
  display: grid;
  grid-gap: 28px;
  grid-template-columns: 65% 35%;
  z-index: 1;
  position: relative;
  margin-bottom: 32px;
  background: ${p => p.theme.colors.backgroundDark};
  transition: transform 0.3s var(--ease-out-quart);
  
  &:hover {
    transform: scale(0.98);
  }
  
  ${mediaqueries.desktop`
    grid-template-columns: 60% 40%;
  `}
  
  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  `;
  
const ImageContainer = styled.div`
  position: relative;
  height: 400px;

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
  height: 200px;
  `}

`;

const TextWrap = styled.div`
  padding-right: 56px;
  padding-top: 32px;
  position: relative;

  ${mediaqueries.tablet`
    padding-right: 16px;
    padding-left: 16px;
    padding-top: 0;
    padding-bottom: 0;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 32px;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};
  transition: color 0.3s ease-in-out;
  margin-bottom: 16px;

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 20px;
  `}
`;

const Desc = styled.p`
  color: ${p => p.theme.colors.grey};
  margin-bottom: 32px;

  ${mediaqueries.tablet`
    font-size: 14px;
  `}
`;

const ButtonLink = styled.div`
  padding: 12px 16px;
  box-sizing: border-box;
  border: 1px solid ${p => p.theme.colors.secondary};
  color: ${p => p.theme.colors.primary};
  background-color: transparent;
  font-size: 16px;
  opacity: 1;
  text-align: center;
  transition: background-color 0.25s ease 0s;
  display: inline-block;
  
  ${mediaqueries.phablet`
    display: block;
  `};

  ${mediaqueries.tablet`
    display: none;
  `}

  &:hover {
    background-color: ${p => p.theme.colors.secondary};
    color: ${p => p.theme.colors.background};
  }
`;
