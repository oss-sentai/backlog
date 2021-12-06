import axios from 'axios';
import { URLSearchParams } from 'url';
import Generator from './generator';
import HttpClient, { HttpResponse } from './httpclient';

interface HttpClientConfig {
  apikey?: string;
  baseUrl: string;
}

interface Headers {
  Authorization?: string;
}

export default class HttpClientImpl extends Generator implements HttpClient {
  private apikey?: string;
  private baseUrl: string;
  private headers?: Headers;

  constructor(config: HttpClientConfig) {
    super();
    this.apikey = config.apikey;
    this.baseUrl = config.baseUrl;
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
    params?: Record<string, unknown>
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
    params: URLSearchParams
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.post<T>(endpoint, params, {
        headers: {
          ...this.headers,
          'content-Type': 'application/x-www-form-urlencoded',
        },
        baseURL: this.baseUrl,
        params: {
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
  async patch<T>(
    endpoint: string,
    params: URLSearchParams | string
  ): Promise<HttpResponse<T>> {
    try {
      // NOTE: If it is an axios patch request, it will fail, so it corresponds to node fetch.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fetch = require('node-fetch');
      const response = await fetch(
        this.baseUrl + endpoint + `?apiKey=${this.apikey}`,
        {
          method: 'PATCH',
          headers: {
            ...this.headers,
            'content-Type': 'application/x-www-form-urlencoded',
          },
          body: params,
        }
      );

      const data = (await response.json()) as T;

      return {
        status: response.status,
        code: response.statusText,
        data,
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
}
