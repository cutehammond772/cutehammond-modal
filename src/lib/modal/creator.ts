import * as React from "react";

import { msg } from "../utils";
import { ModalMapper, ModalProps } from ".";

const logMsg = msg("Modal");

const mapper: ModalMapper = {
  // Modal Mappings
};

export const useMapper = () => mapper;

export const createModal = (
  name: string,
  component: React.ComponentType<ModalProps>
) => {
  if (name in mapper) {
    throw new Error(logMsg.error("'{0}' 모달이 이미 존재합니다.", name));
  }

  mapper[name] = component;
};
