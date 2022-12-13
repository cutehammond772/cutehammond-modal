import * as React from "react";
import * as Styled from "./banner.styled";

import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import { UserMenu } from "../menu";
import Notification from "../notification";
import { NotificationBannerProps, SubjectProps, UserBannerProps } from "../profile.props";

export const Banner = React.memo(
  (props: SubjectProps & React.PropsWithChildren) => (
    <Styled.Banner>
      {!!props.subject && <Styled.Subject>{props.subject}</Styled.Subject>}
      {props.children}
    </Styled.Banner>
  )
);

export const UserBanner = React.memo(
  (props: UserBannerProps & SubjectProps) => (
    <Banner subject={props.subject}>
      <Styled.UserBanner>
        <div className="user">{props.userName || "이름 없음"}</div>
        <UserMenu />
      </Styled.UserBanner>
    </Banner>
  )
);

export const GuestBanner = React.memo((props: SubjectProps) => (
  <Banner subject={props.subject}>
    <Styled.GuestBanner>
      <div className="icons">
        <LoginIcon />
        <TagFacesIcon />
        <EditIcon />
        <ArticleIcon />
      </div>
      <span className="content">{"복잡한 가입 과정 없이 버튼 하나로 가입하시고, 다양한 정보를 누려보세요!"}</span>
    </Styled.GuestBanner>
  </Banner>
));

export const EmptyNotificationBanner = React.memo(
  (props: SubjectProps) => (
    <Banner subject={props.subject}>
      <Styled.EmptyNotificationBanner>
        <AcUnitIcon className="icon" />
        <div className="content">{"아직 받은 알림이 없습니다."}</div>
      </Styled.EmptyNotificationBanner>
    </Banner>
  )
);

export const NotificationBanner = React.memo(
  (props: NotificationBannerProps) => (
    <Banner subject={"최근 알림"}>
      <Notification
        icon={<AcUnitIcon />}
        title="댓글: cutehammond"
        content="처음 뵙겠습니다."
        onClick={() => alert("알림을 클릭하였습니다.")}
        onRemove={() => alert("알림을 지웠습니다.")}
      />
    </Banner>
  )
);
