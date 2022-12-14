import { CreateModalProps } from "../../../lib/types";

export const INFO_MODAL = "info";

export const getInfoModal = (): CreateModalProps => ({
  name: INFO_MODAL,
  data: {},
});
