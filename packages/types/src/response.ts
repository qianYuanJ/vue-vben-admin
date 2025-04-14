export interface Response<T> {
  data?: T;
  msg?: string;
  ok: boolean;
  [property: string]: any;
}
