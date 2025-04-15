/**
 * DepartmentModel
 */
export interface DepartmentModel {
  children?: DepartmentModel[];
  company_id?: string;
  created_time?: Date;
  id?: string;
  name?: string;
  owner_id?: string;
  parent_id?: string;
  remark?: string;
  updated_time?: Date;
  [property: string]: any;
}
