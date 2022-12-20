# cutehammond-modal

이 라이브러리는 커뮤니티 `Pill`에서 사용하고 있는 커스텀 모달 라이브러리입니다.

> 이 Readme는 v0.5.0를 기준으로 작성되었습니다.

[![npm version](https://img.shields.io/npm/v/@cutehammond/modal.svg?style=flat-square)](https://www.npmjs.com/package/@cutehammond/modal)

# 시작하기

## 이 라이브러리에 사용된 기술 스택

|<img width="128" src="https://cdn.simpleicons.org/createreactapp" />|<img width="128" src="https://cdn.simpleicons.org/typescript" />|<img width="128" src="https://cdn.simpleicons.org/redux" />|<img width="128" src="https://cdn.simpleicons.org/reduxsaga" />|<img width="128" src="https://raw.githubusercontent.com/emotion-js/emotion/main/emotion.png" />|
|:---:|:---:|:---:|:---:|:---:|
|***CRA** (create-react-app)|***Typescript**|**Redux-Toolkit**|**Redux-Saga**|***Emotion**|

> '*' 표시된 스택은 이 라이브러리를 사용하는 프로젝트에서 반드시 사용해야 합니다. 

## 라이브러리 설치하기

> npm 명령어

```sh
$ npm install @cutehammond/modal --save
```

> yarn 명령어

```sh
$ yarn add @cutehammond/modal
```

# 튜토리얼

## 1. `GlobalModalProvider` 등록하기

이 React app이 모달을 받을 수 있도록 `<App />` 바깥을 감싸도록 합니다.

> 단, `GlobalStyles`과 같이 전역 스타일 설정이 존재하는 경우 이 설정이 먼저 적용되도록 합니다.

`index.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./styles";

import { GlobalModalProvider } from "@cutehammond/modal";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <GlobalStyles />
    <GlobalModalProvider>
      <App />
    </GlobalModalProvider>
  </>
);
```

## 2. 모달 만들기

이제 초기 설정은 끝났습니다. 예시로 간단한 정보를 전달하는 모달을 만들어 보겠습니다.

> 이 예시는 이 레포지토리의 `demo 폴더`에 포함되어 있습니다.
>
> 이 이외에도 무궁무진한 기능이 포함되어 있습니다! 이후 API 문서를 통해 자세한 방법이 추가될 예정입니다.

---
### 2-1. 모달 레이아웃 정의

모달의 레이아웃을 정의하는 데 `emotion` 라이브러리의 css 함수가 필요합니다.

> 위의 과정을 통해 만들어진 css 객체는 `<ModalBase />` 컴포넌트의 layout prop에 들어갑니다.

> 레이아웃 내의 스타일은 `scss`, `styled-components`, `css` 등 다른 방법으로도 스타일을 정의할 수 있습니다. 여기서는 `styled-components`의 방식으로 예시를 들었습니다.

`info.styled.tsx`

```tsx
/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Modal = css`
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
```

---
### 2-2. 모달 컴포넌트 정의

`<ModalBase />` 컴포넌트를 이용하여 모달을 정의합니다.

- 모달의 고유 이름 `INFO_MODAL`을 생성합니다.
- layout prop에 위에서 정의한 css 객체를 대입합니다.
- `createModal` 함수를 통해 모달을 등록합니다.

> **이때, 컴포넌트의 props는 무조건 `ModalProps`여야 합니다.**

> FAQ: 별도의 props를 전달하고 싶습니다. 이럴 땐 어떻게 해야 할까요?
>
> `useModal` Hook에서 모달을 생성할 때 prop을 전달합니다.
> 
> (이후 API 문서를 통해 자세한 방법이 추가될 예정입니다.)

`info.modal.tsx`

```tsx
import * as React from "react";
import { ModalProps, Modal, createModal } from "@cutehammond/modal";

import * as Styled from "./info.styled";

export const INFO_MODAL = "INFO_MODAL";

const InfoModal = (props: ModalProps) => {
  return (
    <ModalBase layout={Styled.Modal} {...props}>
      <Styled.Container>
        <Styled.Title>정보</Styled.Title>
        <Styled.Content>햄찌는 귀엽습니다.</Styled.Content>
        <Styled.ConfirmButton onClick={props.onClose}>
          확인
        </Styled.ConfirmButton>
      </Styled.Container>
    </ModalBase>
  );
};

createModal(INFO_MODAL, InfoModal);
```

---
### 2-3. `useModal`를 이용하여 create 함수 생성

`useModal` Hook은 모달 생성 함수를 반환합니다. 이 함수를 적절한 시기에 호출하면 됩니다.

- useModal Hook의 매개 변수에 **모달의 고유 이름**을 대입합니다. 

`App.tsx`

```tsx
import React from "react";
import { useModal } from "@cutehammond/modal";

import { INFO_MODAL } from "./demo/modal/info";

export const App = () => {
  const { create: createInfoModal } = useModal(INFO_MODAL);

  return (
    <div>
      <button onClick={createInfoModal}>정보 모달 열기</button>
    </div>
  );
};
```

# 라이선스

Copyright (c) 2022 Jungheon Lee.

Licensed under The MIT License (MIT).
