/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetUsersResponse {
  data: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: date;
    updatedAt: date;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: date | null;
  }[];
}

export interface GetUserByIdResponse {
  data: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: date;
    updatedAt: date;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: date | null;
  };
}

export interface UploadUserImageResponse {
  data: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: date;
    updatedAt: date;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: date | null;
  };
}

export interface UpdateUserBody {
  /** @format email */
  email?: string;
}

export interface UpdateUserResponse {
  data: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: date;
    updatedAt: date;
    role: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: date | null;
  };
}

export type DeleteUserResponse = null;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Boilerplate API
 * @version 1.0
 * @contact
 *
 * Example usage of Swagger with Typebox
 */
export class API<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetProfileV1
     * @request GET:/api/v1/users/me
     */
    usersControllerGetProfileV1: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/me`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerScheduleAlertEmailV1
     * @request GET:/api/v1/users/me/alert-email
     */
    usersControllerScheduleAlertEmailV1: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/me/alert-email`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUsersV1
     * @request GET:/api/v1/users
     */
    usersControllerGetUsersV1: (params: RequestParams = {}) =>
      this.request<GetUsersResponse, any>({
        path: `/api/v1/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUserByIdV1
     * @request GET:/api/v1/users/{id}
     */
    usersControllerGetUserByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<GetUserByIdResponse, any>({
        path: `/api/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateUserV1
     * @request PATCH:/api/v1/users/{id}
     */
    usersControllerUpdateUserV1: (
      id: string,
      data: UpdateUserBody,
      params: RequestParams = {},
    ) =>
      this.request<UpdateUserResponse, any>({
        path: `/api/v1/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerDeleteUserV1
     * @request DELETE:/api/v1/users/{id}
     */
    usersControllerDeleteUserV1: (id: string, params: RequestParams = {}) =>
      this.request<DeleteUserResponse, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUploadUserImageV1
     * @request POST:/api/v1/users/{id}/image
     */
    usersControllerUploadUserImageV1: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<UploadUserImageResponse, any>({
        path: `/api/v1/users/${id}/image`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestConfig
     * @name TestConfigControllerSetupV1
     * @request POST:/api/v1/test-config/setup
     */
    testConfigControllerSetupV1: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/test-config/setup`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestConfig
     * @name TestConfigControllerTeardownV1
     * @request POST:/api/v1/test-config/teardown
     */
    testConfigControllerTeardownV1: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/test-config/teardown`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Health
     * @name HealthControllerCheck
     * @request GET:/api/health
     */
    healthControllerCheck: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "ok" */
          status?: string;
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {} */
          error?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {"database":{"status":"up"}} */
          details?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
        },
        {
          /** @example "error" */
          status?: string;
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {"redis":{"status":"down","message":"Could not connect"}} */
          error?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
          details?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
        }
      >({
        path: `/api/health`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
