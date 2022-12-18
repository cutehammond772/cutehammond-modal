import { ModalTransition } from "../modal";

export type Duration = { open: number; close: number };
export type AnyProps = { [key: string]: any };
export type ModalInfo = { name: string; state: ModalTransition; duration: Duration };
export type ModalIDReference = { modalID: string };

export type ModalIDContainer<T> = { [modalID: string]: T };

export interface ModalState {
    data: ModalIDContainer<AnyProps>;
    info: ModalIDContainer<ModalInfo>;
    
    // GlobalModalProvider에서 생명 주기를 관리할 때 사용한다.
    life: ModalIDContainer<ModalIDReference>;
}

// 모달 Transition의 지속 시간이다. (500 ms)
export const TRANSITION_DURATION = 500;

// 모달의 내부 행위에 대한 타임아웃이다. (5000 ms)
export const MODAL_TIMEOUT = 5000;