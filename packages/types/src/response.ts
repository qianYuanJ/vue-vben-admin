export interface Response<T> {
  data?: T;
  msg?: string;
  ok: boolean;
  [property: string]: any;
}

export interface ResponseList<T> {
  count: number;
  page: number;
  results: T[];
  size: number;
  total_page: number;
  [property: string]: any;
}
