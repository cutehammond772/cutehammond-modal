import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Actions as actions } from "./redux";
import { AnyProps, CreateModalProps } from "./types";

// 모달 생성을 담당하는 Hook이다.
const useModal = <T extends AnyProps>(props: CreateModalProps<T>) => {
  const dispatch = useDispatch();

  // 모달을 생성한다. 이 Hook에서 모달의 관리는 불가능하다.
  const create = useCallback(
    () => dispatch(actions.createModal({ ...props })),
    [dispatch, props]
  );

  return { create };
};

export default useModal;
