import React from "react";

import { INFO_MODAL } from "../demo/modal/info";
import { useModal } from "../lib/dev/modal/hook";
import "./App.css";

export const App = () => {
  const { create: createInfoModal } = useModal(INFO_MODAL);

  return (
    <div className="container">
      <div className="banner">
        <div className="title">@cutehammond / modal</div>
        <div className="description">
          이 라이브러리에 관심을 가져주셔서 감사합니다. 아래에 다양한 모달 샘플이 있으니
          체험해보세요!
        </div>
        <div className="buttons">
          <button className="button" onClick={createInfoModal}>정보 모달</button>
        </div>
      </div>
    </div>
  );
};
