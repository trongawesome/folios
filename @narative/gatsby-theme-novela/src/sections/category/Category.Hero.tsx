import React from 'react'
import styled from '@emotion/styled';

import Section from '@components/Section';
import Headings from "@components/Headings";
import { LinkInternal } from "@components/LinkNav";
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const CategoryHero: React.FC<IAuthor> = ({ category, maxWidth }) => {

  return (
    <Section narrow id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${maxWidth}px` }}>
        <SubHeading>Awesome portfolio inspirations for </SubHeading>
        <HeroHeading>{category.name}</HeroHeading>
        <InfoText>
          {category.bio}
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default CategoryHero;

const HeadingContainer = styled.div`
  margin: 200px auto 112px auto;
  
  ${mediaqueries.desktop`
    width: 80%;
  `}
  
  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const SubHeading = styled(Headings.h3)`
  // ${p => p.theme.textGradient};
  text-align: center;
`;

const HeroHeading = styled(Headings.h1)`
  // ${p => p.theme.textGradient};
  text-align: center;
`;

const InfoText = styled.h3`
  font-size: 22px;
  line-height: 36px;
  margin-top: 16px;
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontsWeight.regular};
  color: ${p => p.theme.colors.secondary};
  text-align: center;
`;

const NavLink = styled(LinkInternal)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 32px;
  line-height: 48px;
  color: ${p => p.theme.colors.grey};
  margin: 0 auto 16px auto;
  display: inline-block;
  box-shadow: inset 0 -2px 0 ${p => p.theme.colors.horizontalRule}

`;