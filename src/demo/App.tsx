import React from "react";

import { INFO_MODAL } from "./modal/info";
import "./App.css";

import { useModal } from "../lib/hook";

export const App = () => {
  const { create: createInfoModal } = useModal(INFO_MODAL);

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
        </div>
      </div>
    </div>
  );
};
