import styled from "@emotion/styled";

const LinkExternal = styled.a`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;

  &::after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
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
    color: ${p => p.theme.colors.accent};

    &::after {
      width: 100%; 
      left: 0; 
    }
  }

  &.active {
    &::after {
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
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
