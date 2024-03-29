import React from 'react';
import styled from '@emotion/styled';

import Section from '@components/Section';
import Headings from "@components/Headings";
import mediaqueries from '@styles/media';

interface HeroProps {
    heading: string;
    subtitle?: string;
    maxWidth: string;
  }

const PageHero: React.FC<HeroProps> = ({ heading, subtitle, maxWidth }) => {

  return (
    <Section narrow>
      <HeadingContainer style={{ maxWidth: `${maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: heading }} />
        <InfoText>
          {subtitle}
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default PageHero;

const HeadingContainer = styled.div`
  margin: 200px auto 112px auto;
  
  ${mediaqueries.desktop`
    width: 80%;
  `}
  
  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled(Headings.h1)`
  // ${p => p.theme.textGradient};
  text-align: center;
`;


const InfoText = styled.div`
  font-size: 20px;
  margin-top: 16px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  text-align: center;

  p {
    margin-top: 8px;
    ${mediaqueries.phablet`
      margin-top: 16px;
    `}
  }
`;
