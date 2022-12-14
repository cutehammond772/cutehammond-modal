import React from "react";
import { getInfoModal } from "./demo/modal/info";
import { getProfile } from "./demo/modal/profile";
import { useModal } from "./lib";

export const App = () => {
  const { create: createProfileModal } = useModal(getProfile("cutehammond"));
  const { create: createGuestModal } = useModal(getProfile(""));
  const { create: createInfoModal } = useModal(getInfoModal());

  return (
    <div>
      <button onClick={createProfileModal}>프로파일 모달</button>
      <button onClick={createGuestModal}>게스트 모달</button>
      <button onClick={createInfoModal}>정보 모달</button>
    </div>
  );
};
