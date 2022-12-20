import { useCallback } from "react";

import { Actions as actions, AnyProps, DynamicSelectors as dynamic, ModalInfo, useAppDispatch } from "./redux";
import { useDynamicSelector } from "./utils";

// 모달 생성을 담당하는 Hook이다.
export const useModal = <T extends AnyProps>(name: string, props?: T) => {
  const dispatch = useAppDispatch();

  // 모달을 생성한다. 이 Hook에서 모달의 관리는 불가능하다.
  // Duration 추가가 필요하다.
  const create = useCallback(
    () => dispatch(actions.createModal({ name, data: props ?? {} })),
    [dispatch, name, props]
  );

  return { create };
};

// 모달의 props를 가져오는 Hook이다.
export const useModalData = <T extends AnyProps>(modalID: string) => {
  const data = useDynamicSelector(dynamic.DATA, modalID) as T | undefined;

  return { data };
};

// 모달의 정보를 가져오는 Hook이다.
export const useModalInfo = (modalID: string) => {
  const info = useDynamicSelector(dynamic.INFO, modalID) as ModalInfo | undefined;

  return { info };
};
