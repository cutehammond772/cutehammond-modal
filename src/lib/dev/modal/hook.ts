import { useCallback } from "react";

import { Actions as actions, AnyProps, useAppDispatch } from "../../redux";

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
