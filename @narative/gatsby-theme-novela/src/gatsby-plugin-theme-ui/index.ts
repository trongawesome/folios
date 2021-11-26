import merge from 'lodash/merge';
import { css } from '@emotion/core';

import colors from './colors';
import tags from './tags';

const breakpoints = [
  ['phone_small', 320],
  ['phone', 376],
  ['phablet', 540],
  ['tablet', 735],
  ['desktop', 1070],
  ['desktop_medium', 1280],
  ['desktop_large', 1440],
];

const fonts = {
  title: "'Title',system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto",
  body:
    "'Text',system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto",
  monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
};

const fontsWeight = {
  regular: "300",
  bold: "600",
};

const colorModeTransition =
  'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

const textGradient = p => css`
  color: transparent;
  -webkit-text-fill-color: transparent; 
  -webkit-background-clip: text;
  background-size: 100%;
  background-image: ${p.theme.colors.accentGradient};
  background-color: ${p.theme.colors.accent};
`;

export default merge({
  initialColorMode: 'light',
  useCustomProperties: true,
  colorModeTransition,
  textGradient,
  colors,
  fonts,
  fontsWeight,
  breakpoints,
  tags,
});
