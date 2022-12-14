/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Layout = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;

  font-family: "Inter", "Noto Sans KR", sans-serif !important;
  background: black;
  border-radius: 20px;
  box-shadow: 0px 0px 10px var(--shadow);

  user-select: none;

  // 모바일 레이아웃
  @media screen and (max-width: 768px) {
    margin-left: 36px;
    margin-right: 36px;

    width: calc(100% - 72px);
  }

  // 데스크톱, 태블릿 레이아웃
  @media screen and (min-width: 768px) {
    margin-left: calc(50% - 348px);
    margin-right: calc(50% - 348px);

    width: 696px;
  }
`;

export const Container = styled.div`
  position: relative;
  padding: 30px;

  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  row-gap: 10px;

  ::-webkit-scrollbar {
    display: none;
  }

  // 모바일 레이아웃
  @media screen and (max-width: 768px) {
    max-height: 80%;
  }

  // 데스크톱, 태블릿 레이아웃
  @media screen and (min-width: 768px) {
    max-height: 700px;
  }
`;

export const Title = styled.div`
  font-weight: 700;
  color: white;

  font-size: 1.75rem;
  line-height: 100%;
`;

export const Content = styled.div`
  font-weight: 500;
  color: white;

  font-size: 1.25rem;
`;

export const ConfirmButton = styled.div`
  width: auto;
  height: auto;
  border-radius: 15px;
  padding: 10px;

  font-weight: 700;
  background-color: blue;
  color: white;

  font-size: 1.25rem;
  line-height: 100%;
  text-align: center;

  cursor: pointer;

  :hover {
    filter: brightness(0.75);
  }

  transition: filter 500ms;
`;
