import { ErrorType } from "../types";

export class AuthError extends Error {
  constructor() {
    super();
    this.name = ErrorType.AuthError;
    this.message = "Não autorizado";
  }
}

export class TerminateSession extends Error {
  constructor() {
    super();
    this.name = ErrorType.TerminateSession;
    this.message = "Sessão terminada";
  }
}

export class ArgumentError extends Error {
  constructor(message: string) {
    super();
    this.name = ErrorType.ArgumentError;
    this.message = message;
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super();
    this.name = ErrorType.NotFoundError;
    this.message = message;
  }
}

export class NotImplemented extends Error {
  constructor(message: string) {
    super();
    this.name = ErrorType.NotImplemented;
    this.message = message;
  }
}

export class UniqueFieldError extends Error {
  constructor(message: string) {
    super();
    this.name = ErrorType.UniqueFieldError;
    this.message = message;
  }
}

export class CustomError extends Error {
  constructor(name: ErrorType, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}
