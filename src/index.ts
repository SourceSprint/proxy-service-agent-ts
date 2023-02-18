import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import {
  GetRequestOptions,
  PostRequestOptions,
  BaseResponse,
  BaseResponseData,
  BaseResponseError,
} from "./interfaces";

import { getSchema, postSchema } from "./schema";

import { ParameterError, OperationError, ServiceError } from "./errors";

export * from "./interfaces";
export * from "./errors";

class Agent {
  private axios: AxiosInstance = Axios.create({
    baseURL: this.host,
  });

  constructor(protected host: string) {
    this.setupAxiosInterceptor();
  }

  private setupAxiosInterceptor() {
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            throw new ParameterError(data.message);
          }

          if (status === 500) {
            throw new OperationError(data.message);
          }

          throw new ServiceError(data.message);
        }

        throw new ServiceError(error.message);
      }
    );
  }

  public async get(options: GetRequestOptions): Promise<BaseResponse> {
    const _options = await getSchema.validate(options, {
      abortEarly: false,
    });

    const { url = "/", params, proxy, headers } = _options;

    const config: AxiosRequestConfig = {
      url: "/get",
      method: "POST",
      data: {
        url,
        params,
        proxy,
        headers,
      },
    };

    const { data } = await this.axios(config);

    if (data.success) {
      return data as BaseResponseData;
    }

    return data as BaseResponseError;
  }

  public async post(options: PostRequestOptions): Promise<BaseResponse> {
    const _options = await postSchema.validate(options, {
      abortEarly: false,
    });

    const { url = "/", data: body, proxy, headers } = _options;

    const config: AxiosRequestConfig = {
      url: "/post",
      method: "POST",
      data: {
        url,
        body,
        proxy,
        headers,
      },
    };

    const { data } = await this.axios(config);

    if (data.success) {
      return data as BaseResponseData;
    }

    return data as BaseResponseError;
  }
}

export const create = (host: string): Agent => {
  const agent = new Agent(host);
  return agent;
};
