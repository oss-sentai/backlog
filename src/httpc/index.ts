import axios from 'axios';
import { URLSearchParams } from 'url';
import { ApiError } from '../exception/backlogApiError';
import HttpClient, { HttpResponse } from './httpclient';

interface HttpClientConfig {
  apikey?: string;
  baseUrl: string;
}

interface Headers {
  Authorization?: string;
}

export default class HttpClientImpl implements HttpClient {
  private apikey?: string;
  private baseUrl: string;
  private headers?: Headers;

  constructor(config: HttpClientConfig) {
    this.apikey = config.apikey;
    this.baseUrl = config.baseUrl;
  }

  private generateError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return new ApiError(error, error.response?.data?.errors);
    }

    const defaultError = error as Error;
    return new ApiError(defaultError);
  }

  setApikey(apikey: string): void {
    this.apikey = apikey;
  }
  setBearerToken(bearerToken: string): void {
    this.headers = {
      ...this,
      Authorization: 'Bearer ' + bearerToken,
    };
  }
  setReadTimeout(readTimeout: string): void {
    throw new Error('Method not implemented.');
  }
  setConnectionTimeout(connectionTimeout: string): void {
    throw new Error('Method not implemented.');
  }
  setUserAgent(userAgent: string): void {
    throw new Error('Method not implemented.');
  }
  getUserAgent(): string {
    throw new Error('Method not implemented.');
  }
  async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    queryParams?: Record<string, unknown>
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.get<T>(endpoint, {
        headers: {
          ...this.headers,
          'content-Type': 'application/json;charset=utf-8',
        },
        baseURL: this.baseUrl,
        params: {
          ...params,
          apiKey: this.apikey,
        },
        data: queryParams,
      });

      return {
        status: response.status,
        code: response.statusText,
        data: response.data,
      };
    } catch (error: unknown) {
      throw this.generateError(error);
    }
  }
  async post<T>(
    endpoint: string,
    params: URLSearchParams | string
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.post<T>(endpoint, {
        headers: {
          ...this.headers,
          'content-Type': 'application/x-www-form-urlencoded',
        },
        baseURL: this.baseUrl,
        params: {
          apiKey: this.apikey,
        },
        data: params,
      });

      return {
        status: response.status,
        code: response.statusText,
        data: response.data,
      };
    } catch (error: unknown) {
      throw this.generateError(error);
    }
  }
  async patch<T>(
    endpoint: string,
    params: URLSearchParams | string
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.patch<T>(endpoint, {
        headers: {
          ...this.headers,
          'content-Type': 'application/x-www-form-urlencoded',
        },
        baseURL: this.baseUrl,
        params: {
          apiKey: this.apikey,
        },
        data: params,
      });

      return {
        status: response.status,
        code: response.statusText,
        data: response.data,
      };
    } catch (error: unknown) {
      throw this.generateError(error);
    }
  }
  async put<P, T>(endpoint: string, body: P): Promise<HttpResponse<T>> {
    try {
      const response = await axios.put<T>(endpoint, {
        headers: {
          ...this.headers,
          'content-Type': 'application/json;charset=utf-8',
        },
        baseURL: this.baseUrl,
        params: {
          apiKey: this.apikey,
        },
        data: body,
      });

      return {
        status: response.status,
        code: response.statusText,
        data: response.data,
      };
    } catch (error: unknown) {
      throw this.generateError(error);
    }
  }
  async delete<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.delete<T>(endpoint, {
        headers: {
          ...this.headers,
          'content-Type': 'application/json;charset=utf-8',
        },
        baseURL: this.baseUrl,
        params: {
          ...params,
          apiKey: this.apikey,
        },
      });

      return {
        status: response.status,
        code: response.statusText,
        data: response.data,
      };
    } catch (error: unknown) {
      throw this.generateError(error);
    }
  }
  postMultiPart(endpoint: string, params: Record<string, unknown>): unknown {
    throw new Error('Method not implemented.');
  }

  // Doc: https://developer.nulab.com/ja/docs/backlog/tips/#
  generateURLSearchParams(arg: Record<string, unknown>) {
    const isObject = (x: unknown): x is Record<string, unknown> =>
      x !== null && (typeof x === 'object' || typeof x === 'function');
    const params = new URLSearchParams();

    const fromObject = (obj: Record<string, unknown>) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          return;
        }

        if (Array.isArray(value)) {
          fromArray(key, value);
          return;
        }

        params.append(`${key}[]`, `${value}`);
      });
    };

    const fromArray = (key: string, values: unknown[]) => {
      values.forEach((item) => {
        if (item === undefined || item === null) {
          return;
        }

        // NOTE: backlogの仕様上存在しないはず
        if (isObject(item)) {
          throw Error('Illegal parameters');
        }

        params.append(`${key}[]`, `${item}`);
      });

      return params;
    };

    fromObject(arg);

    return params;
  }
}
