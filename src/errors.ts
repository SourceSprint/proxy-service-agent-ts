export class ParameterError extends Error {
  name: string = "ParameterError";
}

export class OperationError extends Error {
  name: string = "OperationError";
}

export class ServiceError extends Error {
  name: string = "ServiceError";
}
