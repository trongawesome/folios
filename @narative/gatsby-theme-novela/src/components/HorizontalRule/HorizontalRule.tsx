import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const HorizontalRule = styled.hr`
  position: relative;
  width: 100%;
  max-width: 680px;
  margin: 56px auto 24px auto;
  border: 1px solid ${p => p.theme.colors.horizontalRule};

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};

  ${mediaqueries.tablet`
    width: calc(100% - 40px);
  `};
`;

export default HorizontalRule;
