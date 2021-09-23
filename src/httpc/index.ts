import axios from 'axios';
import HttpClient, { HttpResponse } from './httpclient';

interface HttpClientConfig {
  apikey?: string;
  baseUrl: string;
}

interface Headers {
  'content-Type': string;
  Authorization?: string;
}

export default class HttpClientImpl implements HttpClient {
  private apikey?: string;
  private headers: Headers = {
    'content-Type': 'application/json;charset=utf-8',
  };
  private baseUrl: string;

  constructor(config: HttpClientConfig) {
    this.apikey = config.apikey;
    this.baseUrl = config.baseUrl;
  }

  setApikey(apikey: string): void {
    this.apikey = apikey;
  }
  setBearerToken(bearerToken: string): void {
    this.headers.Authorization = 'Bearer ' + bearerToken;
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
        headers: this.headers,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        throw error;
      }
      throw error as Error;
    }
  }
  post(
    endpoint: string,
    params: Record<string, unknown>,
    headers: Record<string, unknown>
  ): unknown {
    throw new Error('Method not implemented.');
  }
  patch(
    endpoint: string,
    params: Record<string, unknown>,
    headers: Record<string, unknown>
  ): unknown {
    throw new Error('Method not implemented.');
  }
  async put<P, T>(endpoint: string, body: P): Promise<HttpResponse<T>> {
    try {
      const response = await axios.put<T>(endpoint, {
        headers: this.headers,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        throw error;
      }
      throw error as Error;
    }
  }
  delete(endpoint: string, params: Record<string, unknown>): unknown {
    throw new Error('Method not implemented.');
  }
  postMultiPart(endpoint: string, params: Record<string, unknown>): unknown {
    throw new Error('Method not implemented.');
  }
}
