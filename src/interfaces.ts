import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface BaseRequestOptions
  extends Pick<AxiosRequestConfig, "headers" | "params" | "data" | "url"> {
  proxy?: string;
}

export type GetRequestOptions = Omit<BaseRequestOptions, "data">;
export type PostRequestOptions = BaseRequestOptions;

// TODO: Add more methods (PUT, PATCH, DELETE, etc.)

export interface BaseResponseData {
  response: any;
  encoded: string;
  response_url: string;
  status: number;
  headers: Record<string, string>;
  success: boolean;
}

export interface BaseResponseError {
  response?: any;
  response_url?: string;
  status?: number;
  headers: Record<string, string>;
  success: boolean;
  error?: string;
  message?: string;
}

export type BaseResponse = BaseResponseData | BaseResponseError;
