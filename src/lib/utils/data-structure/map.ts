import { msg } from "../log";
import { CopyOption, CopyOptions, IndexSignatureMap, ReplaceFunction } from "./types";

const logMsg = msg("IndexSignatureMap");

// 특정한 원소를 수정합니다. 이때, 존재하지 않는 경우 put과 동일한 기능을 가집니다.
export const replace =
  <T>(map: IndexSignatureMap<T>, copyOption?: CopyOption) =>
  (replaceFn: ReplaceFunction<T>, ...keys: string[]) => {
    const initialValue = (() => {
      switch (copyOption ?? CopyOptions.SWALLOW_COPY) {
        case CopyOptions.COPY_NOTHING:
          return map;

        case CopyOptions.SWALLOW_COPY:
          return Object.keys(map).reduce((acc, key) => {
            acc[key] = map[key];
            return acc;
          }, {} as IndexSignatureMap<T>);

        default:
          throw new Error(logMsg.error("유효하지 않은 복사 옵션입니다."));
      }
    })();

    return keys.reduce((acc, key) => {
      acc[key] = replaceFn(map[key]);

      return acc;
    }, initialValue);
  };

// 맵에 (key, value) 쌍을 추가합니다.
export const put =
  <T>(map: IndexSignatureMap<T>, copyOption?: CopyOption) =>
  (key: string, value: T) => {
    switch (copyOption ?? CopyOptions.SWALLOW_COPY) {
      case CopyOptions.COPY_NOTHING:
        map[key] = value;
        return map;

      case CopyOptions.SWALLOW_COPY:
        const copied = Object.keys(map).reduce((acc, key) => {
          acc[key] = map[key];
          return acc;
        }, {} as IndexSignatureMap<T>);
        copied[key] = value;
        return copied;

      default:
        throw new Error(logMsg.error("유효하지 않은 복사 옵션입니다."));
    }
  };

// 맵의 특정한 원소를 삭제합니다.
export const remove =
  <T>(map: IndexSignatureMap<T>, copyOption?: CopyOption) =>
  (...keys: string[]) => {
    switch (copyOption || CopyOptions.SWALLOW_COPY) {
      case CopyOptions.SWALLOW_COPY:
        return Object.keys(map).reduce((acc, key) => {
          !keys.includes(key) && (acc[key] = map[key]);
          return acc;
        }, {} as IndexSignatureMap<T>);

      default:
        throw new Error(logMsg.error("유효하지 않은 복사 옵션입니다."));
    }
  };
