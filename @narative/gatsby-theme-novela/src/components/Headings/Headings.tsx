import styled from "@emotion/styled";
import { css } from "@emotion/core";

import mediaqueries from "@styles/media";

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = p => css`
  font-weight: ${p.theme.fontsWeight.bold};
  color: ${p.theme.colors.primary};
  font-family: ${p.theme.fonts.title};
`;

const h1 = styled.h1`
  font-size: 72px;
  line-height: 88px;
  letter-spacing: -3px;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 56px;
    line-height: 1.2;
  `};
`;

const h2 = styled.h2`
  font-size:40px;
  line-height: 64px;
  letter-spacing: -2px;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 40px;
  `};

  ${mediaqueries.tablet`
    font-size: 32px;
    line-height: 1.45;
  `};
`;

const h3 = styled.h3`
  font-size:32px;
  line-height: 40px;
  letter-spacing: -2px;
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: 32px;
  `};

  ${mediaqueries.phablet`
    font-size: 32px;
  `};
`;

const h4 = styled.h4`
  font-size: 32px;
  line-height: 40px;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 28px;
  `};
`;

const h5 = styled.h5`
  font-size: 22px;
  line-height: 36px;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 20px;
  `};
`;

const h6 = styled.h6`
  font-size: 22px;
  line-height: 36px;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 20px;
  `};
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};
