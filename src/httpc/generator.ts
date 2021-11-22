import axios from 'axios';
import { URLSearchParams } from 'url';
import { ApiError } from '../exception/backlogApiError';

export default class Generator {
  protected generateError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return new ApiError(error, error.response?.data?.errors);
    }

    const defaultError = error as Error;
    return new ApiError(defaultError);
  }

  // Doc: https://developer.nulab.com/ja/docs/backlog/tips/#
  generateURLSearchParams(
    arg: Record<string, number | string | boolean | (number | string)[]>
  ) {
    const params = new URLSearchParams();

    Object.entries(arg).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(`${key}[]`, `${item}`);
        });
        return;
      }

      params.append(`${key}`, `${value}`);
    });

    return params;
  }
}
