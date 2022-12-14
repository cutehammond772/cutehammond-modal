import React from "react";
import { getInfoModal } from "./demo/modal/info";
import { getProfile } from "./demo/modal/profile";
import { useModal } from "./lib";

import "./App.styled.css";

export const App = () => {
  const { create: createProfileModal } = useModal(getProfile("cutehammond"));
  const { create: createGuestModal } = useModal(getProfile(""));
  const { create: createInfoModal } = useModal(getInfoModal());

  return (
    <div className="container">
      <div className="banner">
        <div className="title">@cutehammond / modal</div>
        <div className="description">
          이 라이브러리에 관심을 가져주셔서 감사합니다. 아래에 다양한 모달 샘플이 있으니
          체험해보세요!
        </div>
        <div className="buttons">
          <button className="button" onClick={createProfileModal}>프로파일 모달</button>
          <button className="button" onClick={createGuestModal}>게스트 모달</button>
          <button className="button" onClick={createInfoModal}>정보 모달</button>
        </div>
      </div>
    </div>
  );
};
