import { useCallback } from "react";
import { useMapper } from "./modal/creator";

import {
  Actions as actions,
  AnyProps,
  DynamicSelectors as dynamic,
  ModalInfo,
  useAppDispatch,
} from "./redux";
import { msg, useDynamicSelector } from "./utils";

const logMsg = msg("useModal");

// 모달 생성을 담당하는 Hook이다.
export const useModal = <T extends AnyProps>(name: string, props?: T) => {
  const dispatch = useAppDispatch();
  const mapper = useMapper();

  // 모달을 생성한다. 이 Hook에서 모달의 관리는 불가능하다.
  // Duration 추가가 필요하다.
  const create = useCallback(() => {
    if (!(name in mapper)) {
      throw new Error(logMsg.error("'{0}'는 존재하지 않는 모달입니다.", name));
    }

    dispatch(
      actions.createModal({
        name,
        data: props ?? {},
        duration: mapper[name].duration,
      })
    );
  }, [dispatch, name, props, mapper]);

  return { create };
};

// 모달의 props를 가져오는 Hook이다.
export const useModalData = <T extends AnyProps>(modalID: string) => {
  const data = useDynamicSelector(dynamic.DATA, modalID) as T | undefined;

  return { data };
};

// 모달의 정보를 가져오는 Hook이다.
export const useModalInfo = (modalID: string) => {
  const info = useDynamicSelector(dynamic.INFO, modalID) as
    | ModalInfo
    | undefined;

  return { info };
};
