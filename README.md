# cutehammond-modal

이 라이브러리는 커뮤니티 `Pill`에서 사용하고 있는 커스텀 모달 라이브러리입니다.

> 이 Readme는 v0.4.0를 기준으로 작성되었습니다.

[![npm version](https://img.shields.io/npm/v/@cutehammond/modal.svg?style=flat-square)](https://www.npmjs.com/package/@cutehammond/modal)

# 시작하기

## 이 라이브러리에 사용된 기술 스택

> 이 기술 스택을 사용하여 프로젝트를 진행하는 분께 이 라이브러리를 추천합니다.

|<img height="128" width="128" src="https://cdn.simpleicons.org/createreactapp" />|<img height="128" width="128" src="https://cdn.simpleicons.org/typescript" />|<img height="128" width="128" src="https://cdn.simpleicons.org/redux" />|<img height="128" width="128" src="https://cdn.simpleicons.org/reduxsaga" />|<img height="128" width="128" src="https://raw.githubusercontent.com/emotion-js/emotion/main/emotion.png" />|
|:---:|:---:|:---:|:---:|:---:|
|**CRA** (create-react-app)|**Typescript**|**Redux-Toolkit**|**Redux-Saga**|**Emotion**|

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

> FAQ: `mapper`가 props로 전달되는데, 이것은 무엇인가요?
>
> 답: 모달의 고유 이름과 모달 컴포넌트를 매핑한 형태입니다. 이후 예시에서 설명합니다.

`index.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./styles";

import { GlobalModalProvider, createModalMapper } from "@cutehammond/modal";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const mapper = createModalMapper(() => ({
  // Some Modal Mappings
}));

root.render(
  <>
    <GlobalStyles />
    <GlobalModalProvider mapper={mapper}>
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

- 모달 컴포넌트 정의

`<ModalBase />` 컴포넌트를 이용하여 커스텀 모달을 정의합니다.

이때 layout prop을 통해 모달의 레이아웃을 직접 정의할 수 있습니다.

> **이때, 컴포넌트의 props는 무조건 `ModalProps`여야 합니다.**

> FAQ: 별도의 props를 전달하고 싶습니다. 이럴 땐 어떻게 해야 할까요?
> 
> 답: `ModalRequest`의 `data prop`을 통해 전달해야 합니다.
>
> (이후 API 문서를 통해 자세한 방법이 추가될 예정입니다.)

`info.modal.tsx`

```tsx
import * as React from "react";
import { ModalProps, Modal } from "@cutehammond/modal";

import * as Styled from "./info.styled";

const InfoModal = (props: ModalProps) => {
  return (
    <ModalBase layout={Styled.Layout} {...props}>
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

export default InfoModal;
```

---

- 모달 스타일 정의

위의 layout prop에는 `emotion의 css`가 들어갑니다.

이 이외에는 `scss`, `styled-components`, `css` 등 다른 방법으로도 스타일을 정의할 수 있습니다.

`info.styled.tsx`

```tsx
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
```

---

- `ModalRequest` 정의

`useModal` Hook을 통해 모달을 생성하는데, 이때 모달의 정보를 전달하는 데 필요합니다.

> 별도의 props가 필요한 경우 data prop에 추가합니다.
>
> (이후 API 문서를 통해 자세한 방법이 추가될 예정입니다.)

> FAQ: 굳이 INFO_MODAL 상수를 따로 두는 이유가 있을까요?
>
> 답: 이는 모달의 고유 이름을 나타내며, 이후에 ModalMapper에서 모달의 고유 이름과 모달 컴포넌트를 매핑하는 데 필요하므로 따로 정의해 두는 것이 좋습니다.

`info.props.tsx`

```tsx
import { ModalRequest } from "@cutehammond/modal";

export const INFO_MODAL = "info";

export const getInfoModal = (): ModalRequest => ({
  name: INFO_MODAL,
  data: {},
});
```

- `ModalMapper`에 모달 추가

`index.tsx`로 돌아와서, 모달의 고유 이름과 모달 컴포넌트를 매핑시킵니다.

`index.tsx`

```tsx
const mapper = createModalMapper(() => ({
  [INFO_MODAL]: InfoModal,
}));
```

- `useModal`를 이용하여 create 함수 생성

`useModal` Hook은 모달 생성 함수를 반환합니다. 이 함수를 적절한 시기에 호출하면 됩니다.

`App.tsx`

```tsx
import React from "react";
import { useModal } from "@cutehammond/modal";

import { getInfoModal } from "./demo/modal/info";

export const App = () => {
  const { create: createInfoModal } = useModal(getInfoModal());

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
