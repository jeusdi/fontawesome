export interface PostalAddress {
  readonly area?: string;
  readonly region?: string;
}

export interface User {
  readonly id?: number | string;
  readonly name?: string;
  readonly surname?: string;
  readonly mail?: string;
  readonly address?: PostalAddress;
}
