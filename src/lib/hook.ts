import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Actions as actions, AnyProps, DynamicSelectors as dynamic } from "./redux";
import { useParamSelector } from "./utils";

export interface ModalRequest<T extends AnyProps = {}> {
  name: string;
  data: T;
}

// 모달 생성을 담당하는 Hook이다.
export const useModal = <T extends AnyProps>(props: ModalRequest<T>) => {
  const dispatch = useDispatch();

  // 모달을 생성한다. 이 Hook에서 모달의 관리는 불가능하다.
  const create = useCallback(
    () => dispatch(actions.createModal({ ...props })),
    [dispatch, props]
  );

  return { create };
};

// 모달의 정보를 가져오는 Hook이다.
export const useModalData = <T extends AnyProps>(modalID: string) => {
  const data = useParamSelector(dynamic.DATA, modalID) as T | undefined;

  return { data };
};
