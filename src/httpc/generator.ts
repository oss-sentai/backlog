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
    arg: Record<string, number | string | (number | string)[]>
  ) {
    const params = new URLSearchParams();

    const fromArray = (key: string, values: (number | string)[]) => {
      values.forEach((item) => {
        if (item === undefined || item === null) {
          return;
        }

        params.append(`${key}[]`, `${item}`);
      });

      return params;
    };

    Object.entries(arg).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      if (Array.isArray(value)) {
        fromArray(key, value);
        return;
      }

      params.append(`${key}`, `${value}`);
    });

    return params;
  }
}
