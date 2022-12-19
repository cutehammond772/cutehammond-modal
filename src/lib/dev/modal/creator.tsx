import * as React from "react";

import { msg } from "../../utils";
import { ModalProps } from "../../modal";

const logMsg = msg("Modal");

interface ModalMapper {
  [name: string]: React.ComponentType<ModalProps>;
}

export const mapper: ModalMapper = {
  // Modal Mappings
};

export const createModal = (
  name: string,
  component: React.ComponentType<ModalProps>
) => {
  if (name in mapper) {
    throw new Error(logMsg.error("'{0}' 모달이 이미 존재합니다.", name));
  }

  mapper[name] = component;
};
