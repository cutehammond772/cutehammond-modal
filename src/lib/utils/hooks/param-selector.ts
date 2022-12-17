import { useRef } from "react";
import { useSelector } from "react-redux";

export type DynamicSelector<T, R> = (state: R, ...args: any) => T;
export type DynamicSelectorParams<F, R, T> = F extends (
  state: R,
  ...args: infer U
) => T
  ? U
  : any;

// 값이 바뀌는 외부 요인(매개변수)이 존재하는 경우 사용하는 곳마다 각각 Selector를 생성해야 한다.
export type DynamicSelectorGenerator<T, R> = () => DynamicSelector<T, R>;

// reselect를 컴포넌트에서 사용할 때,
//
// 1. 매개변수가 필요없는 경우:
// 각 reducer에 정의된 Selector를 그대로 가져다 쓰면 된다.
// 왜냐하면 값이 바뀌는 외부 요인이 존재하지 않기 때문이다.
//
// 2. 매개변수가 필요한 경우:
// 위와 다르게 외부 요인이 존재하므로, 필요한 곳마다 서로 다른 selector 객체를 가져야 한다.
// 만약 하나의 Selector를 사용할 경우, '한 곳'에 서로 다른 데이터가 들어오므로
// reselect를 사용하는 이유인 메모이제이션의 의미가 없어지게 된다.
const useParamSelector = <T, R>(
  selector: DynamicSelectorGenerator<T, R>,
  ...params: DynamicSelectorParams<ReturnType<typeof selector>, R, T>
) => {
  // selector 객체가 전역이 아닌 컴포넌트 내에 존재하는 경우,
  // 일반적인 Hook 정의하듯이 정의하면 리렌더마다 초기화되므로 메모이제이션의 의미가 없어지게 된다.
  // 따라서 useRef로 한 번 감싸서 리렌더링과 관계 없이 값을 유지할 수 있도록 해야 한다.
  const selectorRef = useRef<DynamicSelector<T, R>>(selector());

  return useSelector((state: R) => selectorRef.current(state, ...params));
};

export default useParamSelector;
