import { LIBRARY_NAME } from "..";

const LogTypes = {
  INFO: "Info",
  ERROR: "Error",
  WARNING: "Warning",
} as const;

type LogType = typeof LogTypes[keyof typeof LogTypes];

const log = (type: LogType, subject: string, message: string) =>
  `[${type}] [${LIBRARY_NAME}] [${subject}] ${message}`;

export const info = (subject: string, message: string) => log(LogTypes.INFO, subject, message);
export const error = (subject: string, message: string) => log(LogTypes.ERROR, subject, message);
export const warn = (subject: string, message: string) => log(LogTypes.WARNING, subject, message);
