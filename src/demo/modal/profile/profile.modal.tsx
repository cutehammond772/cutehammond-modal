import * as React from "react";
import * as Styled from "./profile.styled";

import { useRef } from "react";
import { DefaultModal } from "../default";
import { GuestBanner, NotificationBanner, UserBanner } from "./banner";

import { GuestMenu } from "./menu";
import { ModalProps, useModalData } from "../../../lib";
import { ProfileData } from "./profile.props";
import { createModal } from "../../../lib";

export const PROFILE_MODAL = "PROFILE_MODAL";

const ProfileModal = (props: ModalProps) => {
  const { data: profile } = useModalData<ProfileData>(props.modalID);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <DefaultModal {...props}>
      <Styled.Tab ref={containerRef}>
        {!profile?.userName ? (
          <>
            <GuestBanner />
            <GuestMenu />
          </>
        ) : (
          <>
            <UserBanner userName={profile.userName || "이름 없음"} />
            <NotificationBanner count={5} />
          </>
        )}
      </Styled.Tab>
    </DefaultModal>
  );
};

// 모달을 등록한다.
createModal(PROFILE_MODAL, ProfileModal);
