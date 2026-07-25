/**
 * MPT API Integration Error Hierarchy
 */

export class MPTBaseError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = 'MPTBaseError';
  }
}

export class MPTApiError extends MPTBaseError {
  constructor(message: string, statusCode?: number, public readonly responseBody?: unknown) {
    super(message, statusCode);
    this.name = 'MPTApiError';
  }
}

export class MPTAuthenticationError extends MPTBaseError {
  constructor(message = 'Invalid or expired MPT API key credentials') {
    super(message, 401);
    this.name = 'MPTAuthenticationError';
  }
}

export class MPTRateLimitError extends MPTBaseError {
  constructor(message = 'MPT API rate limit exceeded') {
    super(message, 429);
    this.name = 'MPTRateLimitError';
  }
}

export class MPTNetworkError extends MPTBaseError {
  constructor(message = 'MPT API network request timed out or connection failed') {
    super(message, 504);
    this.name = 'MPTNetworkError';
  }
}
