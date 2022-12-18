import { ModalMapperGenerator, TransitionPropsGenerator } from "./modal";

// 굳이 함수로 한번 더 감싸는 이유는,
// 그렇지 않을 경우 '상수 초기화 순서'에 대한 이슈가 생길 수 있기 때문이다.

export const createModalMapper = (fn: ModalMapperGenerator) => fn;

export const createTransitionProps = (fn: TransitionPropsGenerator) => fn;