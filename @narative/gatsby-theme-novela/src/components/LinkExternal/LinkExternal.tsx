import styled from "@emotion/styled";
import mediaqueries from "@styles/media";


const LinkExternal = styled.a`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 14px;
  color: ${p => p.theme.colors.secondary};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  margin-left: 40px;

  ${mediaqueries.phone`
    margin-left: 24px;
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
    color: ${p => p.theme.colors.secondary};

    &::after {
      width: 100%; 
      left: 0; 
    }
  }

  &.active {
    &::after {
      background: none repeat scroll 0 0 transparent;
      bottom: -8px;
      content: "";
      display: block;
      height: 2px;
      left: calc(50% - 10px);
      position: absolute;
      background: ${p => p.theme.colors.accent};
      transition: width 0.25s ease 0s, left 0.25s ease 0s;
      width: 20px;
    }
  }
`;

export default LinkExternal;
