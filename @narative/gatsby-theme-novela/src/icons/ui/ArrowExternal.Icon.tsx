import React from "react";
import styled from "@emotion/styled";

import { Icon } from '@types';

const ArrowExternal: Icon = ({ fill }) => (
  <IconContainer>
    <svg
      width="12" height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.672 9.078V1.742c0-.445-.281-.742-.735-.742l-7.335.016c-.438 0-.72.32-.72.687 0 .367.321.68.688.68h2.32l3.72-.14-1.415 1.25-6.976 6.991a.69.69 0 00-.219.477c0 .367.328.719.71.719a.67.67 0 00.485-.211L9.18 4.477l1.258-1.415-.149 3.555V9.11c0 .36.313.688.695.688a.7.7 0 00.688-.719z"
      fill={fill} />
    </svg>
  </IconContainer>
);

export default ArrowExternal;

const IconContainer = styled.span`
    svg {
      vertical-align: baseline;
      path {
          fill: ${p => p.theme.colors.primary};
      }
    }
`;