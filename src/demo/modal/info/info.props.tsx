import { ModalRequest } from "../../../lib";

export const INFO_MODAL = "info";

export const getInfoModal = (): ModalRequest => ({
  name: INFO_MODAL,
  data: {},
});
