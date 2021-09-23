export default interface HttpClient {
  setApikey(apikey: string): void;
  setBearerToken(bearerToken: string): void;
  setReadTimeout(readTimeout: string): void;
  setConnectionTimeout(connectionTimeout: string): void;
  setUserAgent(userAgent: string): void;
  getUserAgent(): string;

  get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    queryParams?: Record<string, unknown>
  ): Promise<HttpResponse<T>>;
  post(
    endpoint: string,
    params: Record<string, unknown>,
    headers: Record<string, unknown>
  ): unknown;
  patch(
    endpoint: string,
    params: Record<string, unknown>,
    headers: Record<string, unknown>
  ): unknown;
  put<T, U>(endpoint: string, body: T): Promise<HttpResponse<U>>;
  delete(endpoint: string, params: Record<string, unknown>): unknown;
  postMultiPart(endpoint: string, params: Record<string, unknown>): unknown;
}

export interface HttpResponse<T> {
  status: number;
  code: string;
  data: T;
}
