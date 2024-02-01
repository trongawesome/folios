import { css } from "@emotion/core";

export const globalStyles = css`
  /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */
  
  // @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700&display=swap');

  :root {
    --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
    --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
    --bounce: cubic-bezier(.5,2.5,.7,.7),box-shadow .3s cubic-bezier(.5,2.5,.7,.7);
  border-radius: 25px
    
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-display: block;
  }

  :root {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.4;
  }

  body {
    font-family: "Text", Serif;
    font-size: 1.6rem;
    margin: 0;
    font-weight: 400;
    height: 100%;
    cursor: auto;
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:focus {
    outline: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  input,
  textarea,
  select,
  button {
    font-family: "Text", Serif;
  }

  .underline {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
  }

  code {
    font-size: 18px;
    padding: 2px 8px;
    background-color: #F0FFFF;
    border-radius: 4px;
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none;
  }

  details {
    display: block;
  }

  input {
    &:focus,
    &:active {
      outline: none;
    }

    &[type="number"] {
      width: auto;
    }
  }

  img.Image__Zoom ~ div {
    background: transparent !important;
  }

  p.dropcap:first-letter {
    font-family: "Recoleta", Serif;
    font-weight: 600;
    font-style: normal;
    font-size: 6em;
    float: left;
    margin-right: 4px;
    margin-top: 22px;
    line-height: .5;
    text-transform: uppercase;
    color: #3A5C21;
  }

  // custom button
  .button.button-prim {
    osition: relative;
    font-size: 18px;
    line-height: 32px;
    margin-top: 24px;
    display: inline-block;
    padding: 8px 20px;
    border-radius: 24px;
    background-color: var(--theme-ui-colors-accent, #F5B802);
    color: var(--theme-ui-colors-black, #111216);
    transition: all .3s var(--bounce);
    font-weight: 700;
    text-align: center;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .button.button-prim:hover {
    box-shadow: 0 0 0 1px var(--theme-ui-colors-primary, #111216),0 5px 0 0 var(--theme-ui-colors-primary, #111216);
    transform: translateY(-5px);
    color: var(--theme-ui-colors-black, #111216) !important;
  }
`;
