import * as React from "react";
import * as Styled from "./menu.styled";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export const UserMenu = React.memo(() => (
  <Styled.Menu>
    <Styled.MenuButton>
      <LogoutIcon />
      <div>{"로그아웃"}</div>
    </Styled.MenuButton>
    <Styled.MenuButton>
      <ManageAccountsIcon />
      <div>{"관리"}</div>
    </Styled.MenuButton>
  </Styled.Menu>
));

export const GuestMenu = React.memo(() => (
  <Styled.Menu>
    <Styled.MenuButton>
      <LoginIcon />
      <div>{"로그인"}</div>
    </Styled.MenuButton>
  </Styled.Menu>
));
