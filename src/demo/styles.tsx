/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

// default font
import "@fontsource/inter/500.css";
import "@fontsource/noto-sans-kr/500.css";

const style = css`
  html, body {
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;

    box-sizing: border-box;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  html * {
    font-family: "Inter", "Noto Sans KR", sans-serif !important;
    user-select: none;
  }

  :root {
    // Default Colors
    --panel: white;
    --light: white;
    --dark: #303030;

    --shadow: #aaaaaa;

    --red: red;
    --pink: pink;
    --blue: skyblue;
    --purple: #9a19b4;

    --success: #17ac1e;
    --primary: #4141dd;
    --sub: #707070;
    --warning: #ffae00;
    --danger: #9c0000;

    // Z Indexes
    --z-header-tab: 1001;
    --z-modal: 1100;

    // Screen Sizes
    --large-desktop: 1200px;
    --desktop: 992px;
    --tablet: 768px;
    --mobile: 576px;
  }
`;

const GlobalStyles = () => {
  return <Global styles={style} />;
};

export default GlobalStyles;
