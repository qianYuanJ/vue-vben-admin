/**
 * Sort
 */
export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
  [property: string]: any;
}

export type Operation =
  | '!'
  | '%'
  | '%suffix'
  | '*'
  | '<'
  | '<='
  | '='
  | '>'
  | '>='
  | 'prefix%';
/**
 * SearchCriteria
 */
export interface SearchCriteria {
  field?: string;
  field_type?: string;
  operation?: Operation;
  or_group?: string;
  value?: any;
  [property: string]: any;
}
/**
 * Pageable
 */
export interface RequestListParams {
  page: number;
  param: SearchCriteria[];
  size: number;
  sort: Sort[];
  [property: string]: any;
}
