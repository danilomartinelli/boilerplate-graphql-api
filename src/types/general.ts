import { db } from "../db";

export interface IContext {
  db: typeof db;
  token: string | undefined;
}

export enum ErrorType {
  AuthError = "AuthError",
  ArgumentError = "ArgumentError",
  NotFoundError = "NotFoundError",
  InvalidCredentials = "InvalidCredentials",
  UniqueFieldError = "UniqueFieldError",
  TerminateSession = "TerminateSession",
  NotImplemented = "NotImplemented"
}
