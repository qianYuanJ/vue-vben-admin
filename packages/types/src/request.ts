export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

/**
 * Sort
 */
export interface Sort {
  field: string;
  order: Order;
  [property: string]: any;
}

export enum Operation {
  Empty = '=',
  Fluffy = '>=',
  Indecent = '*',
  Indigo = '%',
  Operation = '!',
  Prefix = 'prefix%',
  Purple = '>',
  Sticky = '<=',
  Suffix = '%suffix',
  Tentacled = '<',
}

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
