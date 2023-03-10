import { AxiosRequestConfig } from "axios";

export interface BaseRequestOptions
  extends Pick<AxiosRequestConfig, "headers" | "params" | "data" | "url"> {
  proxy?: string;
  ssl?: boolean;
}

export type GetRequestOptions = Omit<BaseRequestOptions, "data">;
export type PostRequestOptions = BaseRequestOptions;

// TODO: Add more methods (PUT, PATCH, DELETE, etc.)

export interface BaseResponseData<T = unknown> {
  response: T;
  encoded: string;
  response_url: string;
  status: number;
  headers: Record<string, string>;
  success: boolean;
}

export interface BaseResponseError<T = unknown> {
  response?: T;
  response_url?: string;
  status?: number;
  headers: Record<string, string>;
  success: boolean;
  error?: string;
  message?: string;
}

export type BaseResponse<T = unknown, K = unknown> =
  | BaseResponseData<T>
  | BaseResponseError<K>;
