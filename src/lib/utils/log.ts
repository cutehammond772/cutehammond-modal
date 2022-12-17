import { consts } from "..";

const LogTypes = {
  INFO: "Info",
  ERROR: "Error",
  WARNING: "Warning",
} as const;

type LogType = typeof LogTypes[keyof typeof LogTypes];
type LogFunction = (message: string, ...args: string[]) => void;

const format = (text: string, ...args: string[]) =>
  args.reduce((text, argument, index) => text.replace(`{${index}}`, argument), text);

const formatted = (type: LogType, message: string, ...args: string[]) => {
  const formatted = format(message, ...args);

  return `[${type}] [${consts.LIBRARY_NAME}] ${formatted}`;
};

export const info: LogFunction = (message, ...args) => {
  console.log(formatted(LogTypes.INFO, message, ...args));
};

export const warn: LogFunction = (message, ...args) => {
  console.warn(formatted(LogTypes.WARNING, message, ...args));
};

export const error: LogFunction = (message, ...args) => {
  console.error(formatted(LogTypes.ERROR, message, ...args));
};

export const logger = (subject: string) => ({
  info: (message: string, ...args: string[]) => info(`[${subject}] ${message}`, ...args),
  warn: (message: string, ...args: string[]) => warn(`[${subject}] ${message}`, ...args),
  error: (message: string, ...args: string[]) => error(`[${subject}] ${message}`, ...args),
});

export const msg = (subject: string) => ({
  info: (message: string, ...args: string[]) => formatted(LogTypes.INFO, `[${subject}] ${message}`, ...args),
  warn: (message: string, ...args: string[]) => formatted(LogTypes.WARNING, `[${subject}] ${message}`, ...args),
  error: (message: string, ...args: string[]) => formatted(LogTypes.ERROR, `[${subject}] ${message}`, ...args),
});
