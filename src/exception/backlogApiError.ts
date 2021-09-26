export const ERROR_CODE = {
  // If an error occurs in the API Server.
  INTERNAL_ERROR: 1,

  // If you call an API that is not available in your licence.
  LICENCE_ERROR: 2,

  // If space licence has expired.
  LICENCE_EXPIRED_ERROR: 3,

  // If you access from an IP Address that is not allowed.
  ACCESS_DENIED_ERROR: 4,

  // If your operation is denied.
  UNAUTHORIZED_OPERATION_ERROR: 5,

  // If you access a resource that does not exist.
  NO_RESOURCE_ERROR: 6,

  // If you post a request with invalid parameters.
  INVALID_REQUEST_ERROR: 7,

  // If it exceeds the capacity of your space.
  SPACE_OVER_CAPACITY_ERROR: 8,

  // If you call an API to add a resource when it exceeds a limit provided in the resource.
  RESOURCE_OVERFLOW_ERROR: 9,

  // If the uploaded attachment is too large.
  TOO_LARGE_FILE_ERROR: 10,

  // If you are not registered on a target space.
  AUTHENTICATION_ERROR: 11,

  // If you are disabled Two-Factor Authentication in the space requiring 2-step verification.
  REQUIRED_MFA_ERROR: 12,

  // If your API access exceeded the rate limit.
  TOO_MANY_REQUESTS_ERROR: 13,
} as const;

interface BacklogAPIErrorMessage {
  message: string;
  code: typeof ERROR_CODE[keyof typeof ERROR_CODE];
  errorInfo?: string;
  moreInfo: string;
}

export class ApiError extends Error {
  errors: BacklogAPIErrorMessage[];

  constructor(err: Error, errors?: BacklogAPIErrorMessage[]) {
    super(err.message);
    this.errors = errors || [];
    this.message = err.message;
    this.name = err?.name ?? '';
    this.stack = err?.stack ?? '';
  }
}
