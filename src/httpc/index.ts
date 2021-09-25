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
  private urlencodedType = 'application/x-www-form-urlencoded';

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
  setContentTypeByUrlencoded(): void {
    this.headers['content-Type'] = this.urlencodedType;
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
  async post<P, T>(endpoint: string, params: P): Promise<HttpResponse<T>> {
    try {
      const response = await axios.post<T>(endpoint, {
        headers: this.headers,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        throw error;
      }
      throw error as Error;
    }
  }
  async patch<P, T>(
    endpoint: string,
    params: P // jsonでもurlencodedでもどうせstringだからstringで良い・・・？
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.patch<T>(endpoint, {
        headers: this.headers,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        throw error;
      }
      throw error as Error;
    }
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
  async delete<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.delete<T>(endpoint, {
        headers: this.headers,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        throw error;
      }
      throw error as Error;
    }
  }
  postMultiPart(endpoint: string, params: Record<string, unknown>): unknown {
    throw new Error('Method not implemented.');
  }
}
