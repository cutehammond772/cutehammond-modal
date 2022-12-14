import { LIBRARY_NAME } from "../..";
import { CopyOption, CopyOptions, Filter } from "./types";

// copyOption을 통해 반환되는 배열의 복사 여부를 정할 수 있다. (기본 설정은 SWALLOW_COPY)
// 1. COPY_NOTHING: 어떤 복사도 하지 않고 배열 참조를 그대로 반환한다.
// 2. SWALLOW_COPY: 배열 내 원소의 참조는 그대로 한 채 배열만 복사한다. (얕은 복사)
const applyCopy = <T>(array: Array<T>, copyOption: CopyOption) => {
  switch (copyOption) {
    case CopyOptions.COPY_NOTHING:
      return array;
    case CopyOptions.SWALLOW_COPY:
      return [...array];

    default:
      throw new Error(`[${LIBRARY_NAME}] [SmartArray] 유효하지 않은 복사 옵션입니다.`);
  }
};

// 원소의 타입이 기본형인지 확인한다.
const isPrimitive = (value: any) =>
  (typeof value !== "object" && typeof value !== "function") || value === null;

// 배열에 원소를 추가한다.
// 1. 배열의 존재 여부를 신경쓰지 않아도 된다.
// 2. '배열'을 얕은 복사 또는 복사하지 않을 지 결정할 수 있다.
export const push =
  <T>(array?: Array<T>, copyOption?: CopyOption) =>
  (...elements: T[]) => {
    const optional = applyCopy(
      array || [],
      copyOption || CopyOptions.SWALLOW_COPY
    );

    optional.push(...elements);
    return optional;
  };

// 배열 내 원소를 삭제한다.
// 1. 배열의 존재 여부를 신경쓰지 않아도 된다.
// 2. filter 형태 또는 직접 원소를 대입하여 삭제할 지 결정할 수 있다.
//
// 2-1. 직접 원소를 삭제할 때, 원소의 타입이 '기본형'인 경우, (string, number, boolean, symbol, null, undefined)
// 직접 값을 비교하므로 의도대로 로직이 수행된다.
//
// 2-2. 원소의 타입이 '참조형'인 경우,
// 위 세 타입이 아닌 다른 타입인 경우, 참조 값만을 비교하기 때문에 의도와는 다른 결과가 일어날 수 있다.
// 따라서 별다른 설정 없이 참조형 원소를 가진 배열에 대해 remove를 수행하면 오류를 발생시킨다.
// 만약 이를 인지하여 의도대로 결과가 일어날 수 있도록 따로 로직을 작성한 경우,
// ignoreRefTypeError를 true로 설정하면 오류를 발생시키지 않고 그대로 수행한다.
export const remove =
  <T>(
    array?: Array<T>,
    copyOption?: CopyOption,
    ignoreRefTypeError?: boolean
  ) =>
  (filter?: Filter<T>, ...elements: T[]) => {
    if (!!elements && !isPrimitive(elements[0]) && !ignoreRefTypeError) {
      throw new Error(`[${LIBRARY_NAME}] [SmartArray] 참조형 타입의 원소를 가진 배열의 삭제를 별다른 로직 없이 수행할 경우, 
      참조 값만을 비교하는 특성에 의해 의도치 않은 결과가 일어날 수 있습니다.
      이를 인지하고 따로 대비했다면, ignoreRefTypeError를 true로 설정하세요.`);
    }

    switch (copyOption || CopyOptions.SWALLOW_COPY) {
      case CopyOptions.SWALLOW_COPY:
        return (array || [])
          .filter(!!filter ? (e: T) => !filter(e) : ((_: T) => true))
          .filter((e: T) => !elements.includes(e));

      default:
        throw new Error(`[${LIBRARY_NAME}] [SmartArray] 유효하지 않은 복사 옵션입니다.`);
    }
  };
