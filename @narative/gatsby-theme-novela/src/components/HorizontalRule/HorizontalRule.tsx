import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const HorizontalRule = styled.hr`
  position: relative;
  width: 100%;
  max-width: 680px;
  margin: 32px auto 64px auto;
  border: 0;
  height: 14px;
  background-image: url("/separator.svg");
  background-repeat: no-repeat;
  box-sizing: border-box;
  background-position: center;

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
    width: calc(100vw - 40px);
  `};
`;

export default HorizontalRule;
