import * as React from "react";
import * as Styled from "./profile.styled";

import { useRef, useLayoutEffect } from "react";
import { DefaultModal } from "../default";
import { GuestBanner, NotificationBanner, UserBanner } from "./banner";

import { GuestMenu } from "./menu";
import { CustomModalProps, useModalData } from "../../../lib";
import { ProfileData } from "./profile.props";

const ProfileModal = (props: CustomModalProps) => {
  const { data: profile } = useModalData<ProfileData>(props.modalID);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (props.open) {
      !!containerRef?.current && containerRef.current.focus();
    }
  }, [props.open]);

  return (
    <DefaultModal
      open={props.open}
      onClose={props.onClose}
      modalID={props.modalID}
    >
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

export default ProfileModal;
