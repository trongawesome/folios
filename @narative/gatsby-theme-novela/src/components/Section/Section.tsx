import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

const Section = styled.section<{ narrow?: boolean }>`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;

  ${mediaqueries.desktop`
  `};

  ${p =>
    p.narrow
      ? mediaqueries.tablet`
          padding: 0 2rem;
        `
      : mediaqueries.tablet`
          padding: 0 4rem;
        `}

  ${mediaqueries.phablet`
    max-width: 100%;
  `};
`;

export default Section;
