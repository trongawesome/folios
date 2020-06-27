import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 15px auto 50px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.title};

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${p => p.theme.fonts.title};
    max-width: 880px !important;
    padding-right: 100px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 36px;
    line-height: 1.32;
    font-weight: ${p => p.theme.fontsWeight.bold};

    ${mediaqueries.tablet`
      font-size: 26px;
      padding: 0 80px;
    `};

    ${mediaqueries.phablet`
      font-size: 36px;
      padding: 0 20px 0 40px;
    `};
  }

  cite {
    display: block;
    font-size: 20px;
    margin-top: 8px;
    
    ${mediaqueries.tablet`
      padding-left: 180px;
      font-size: 16px;
    `};

    ${mediaqueries.phablet`
      padding-left: 40px;
    `};

  }
`;

export default Blockquote;
