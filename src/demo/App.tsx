import React from "react";

import { INFO_MODAL } from "./modal/info";
import "./App.css";

import { useModal } from "../lib/hook";
import { ProfileData, PROFILE_MODAL } from "./modal/profile";

export const App = () => {
  const { create: createInfoModal } = useModal(INFO_MODAL);
  const { create: createGuestModal } = useModal(PROFILE_MODAL);
  const { create: createUserModal } = useModal<ProfileData>(PROFILE_MODAL, { userName: "cutehammond" });

  return (
    <div className="container">
      <div className="banner">
        <div className="title">@cutehammond / modal</div>
        <div className="description">
          Thank you for using 'cutehammond-modal' library. <br />
          There are a variety of modals, so try them out!
        </div>
        <div className="buttons">
          <button className="button" onClick={createInfoModal}>정보 모달</button>
          <button className="button" onClick={createGuestModal}>게스트 모달</button>
          <button className="button" onClick={createUserModal}>유저 모달</button>
        </div>
      </div>
    </div>
  );
};
