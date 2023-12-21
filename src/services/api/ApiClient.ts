import fetch from "cross-fetch";

export type ApiConfiguration = {
  baseURL: string;
  accessToken: string;
};

export type RequestConfig = Record<string, unknown>;

export type TDefaultResponse = {
  data: any | null;
  error: any;
};

export interface IApiClient {
  post(
    path: string,
    body: string,
    config?: RequestConfig
  ): Promise<TDefaultResponse>;
  patch(path: string, body: BodyInit): Promise<TDefaultResponse>;
  delete(path: string, body?: BodyInit): Promise<TDefaultResponse>;
  put(path: string, body: BodyInit): Promise<TDefaultResponse>;
  get(path: string): Promise<TDefaultResponse>;
}

export default class ApiClient implements IApiClient {
  private client: typeof fetch;
  private requestConfig: RequestConfig;
  private appConfig: ApiConfiguration;

  private async formatResponse(response?: Response, _error?: unknown) {
    let data = undefined;
    let error: unknown = _error;

    const resText = await response?.text();

    if (response?.ok) {
      data = resText !== "" ? JSON.parse(resText as string) : undefined;
    } else if (!_error) {
      error = resText;
    }

    if (error) console.error(error);

    return {
      data,
      error,
    };
  }

  constructor(appConfig: ApiConfiguration) {
    this.appConfig = appConfig;
    this.requestConfig = {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        ...(appConfig.accessToken && {
          Authorization: `Token ${appConfig.accessToken}`,
        }),
      },
    };
    this.client = fetch;
  }

  setAccessToken(token: string) {
    this.appConfig = { ...this.appConfig, accessToken: token };
    this.requestConfig = {
      ...this.requestConfig,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    };
  }

  async post(
    path: string,
    payload: any,
    config?: RequestConfig
  ): Promise<TDefaultResponse> {
    try {
      const response = await this.client(`${this.appConfig.baseURL}${path}`, {
        method: "post",
        body: JSON.stringify(payload),
        ...this.requestConfig,
        ...config,
      });

      return this.formatResponse(response);
    } catch (error) {
      return this.formatResponse(undefined, error);
    }
  }

  async patch<B>(path: string, payload: B): Promise<TDefaultResponse> {
    try {
      const response = await this.client(`${this.appConfig.baseURL}${path}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        ...this.requestConfig,
      });

      return this.formatResponse(response);
    } catch (error) {
      return this.formatResponse(undefined, error);
    }
  }

  async put<B>(path: string, payload: B): Promise<TDefaultResponse> {
    try {
      const response = await this.client(`${this.appConfig.baseURL}${path}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        ...this.requestConfig,
      });

      return this.formatResponse(response);
    } catch (error) {
      return this.formatResponse(undefined, error);
    }
  }

  async get(path: string): Promise<TDefaultResponse> {
    try {
      const response = await this.client(`${this.appConfig.baseURL}${path}`, {
        method: "get",
        ...this.requestConfig,
      });

      return this.formatResponse(response);
    } catch (error) {
      return this.formatResponse(undefined, error);
    }
  }

  async delete(path: string, payload?: BodyInit): Promise<TDefaultResponse> {
    try {
      const response = await this.client(`${this.appConfig.baseURL}${path}`, {
        method: "DELETE",
        body: JSON.stringify(payload),
        ...this.requestConfig,
      });

      return this.formatResponse(response);
    } catch (error) {
      return this.formatResponse(undefined, error);
    }
  }
}
