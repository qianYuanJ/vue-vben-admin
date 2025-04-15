import type {
  DepartmentModel,
  PlatformUser,
  RequestListParams,
  Response,
  ResponseList,
} from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemDeptApi {
  export interface SystemDept {
    [key: string]: any;
    children?: SystemDept[];
    id: string;
    name: string;
    remark?: string;
  }
  export interface UpdateAndRemoveSystemDeptApiParams {
    company_id?: string;
    id?: string;
    name?: string;
    owner_id?: string;
    parent_id?: string;
    remark?: string;
    [property: string]: any;
  }
}

/**
 * 获取部门列表数据
 */
async function getDeptList() {
  return requestClient.get<Response<DepartmentModel[]>>(
    '/platform_department/all',
  );
}

/**
 * 创建部门
 * @param data 部门数据
 */
async function createDept(data: DepartmentModel) {
  return requestClient.post<Response<DepartmentModel>>(
    '/platform_department/add',
    data,
  );
}

/**
 * 更新部门
 *
 * @param data 部门数据
 */
async function updateDept(
  data: SystemDeptApi.UpdateAndRemoveSystemDeptApiParams,
) {
  return requestClient.post('/platform_department/update', data);
}

/**
 * 删除部门
 * @param data 部门数据 主要是id
 */
async function deleteDept(
  data: SystemDeptApi.UpdateAndRemoveSystemDeptApiParams,
) {
  return requestClient.post('/platform_department/delete', data);
}

export { createDept, deleteDept, getDeptList, updateDept };

export namespace SystemEmployeeApi {
  export interface SystemDept {
    [key: string]: any;
    children?: SystemDept[];
    id: string;
    name: string;
    remark?: string;
    status: 0 | 1;
  }

  export interface CreateEmployeeApiParams {
    department_id: string;
    department_name: string;
    id: string;
    job: string;
    nickname: string;
    phone: string;
    role_ids: string[];
    sex: string;
    user_id?: string;
    [property: string]: any;
  }

  export interface UpdateEmployeeApiParams {
    department_id: string;
    department_name: string;
    id: string;
    job: string;
    nickname: string;
    phone: string;
    role_ids: string[];
    sex: string;
    user_id?: string;
    [property: string]: any;
  }
}

/**
 * 获取员工列表数据
 * @param data 分页参数
 */
async function getEmployeeList(data: RequestListParams) {
  return requestClient.post<ResponseList<PlatformUser[]>>(
    '/platform_user/get_platform_user_page',
    data,
  );
}
/**
 * 创建员工
 * @param data 员工数据
 */
async function createEmployee(data: SystemEmployeeApi.CreateEmployeeApiParams) {
  return requestClient.post<Response<PlatformUser>>(
    '/platform_user/add_platform_user',
    data,
  );
}

/**
 * 编辑员工
 * @param data 员工数据
 */
async function updateEmployee(data: SystemEmployeeApi.UpdateEmployeeApiParams) {
  return requestClient.post<Response<null>>(
    '/platform_user/update_platform_user',
    data,
  );
}
/**
 * 删除员工
 * @param id 员工id
 */
async function deleteEmployee(id: string) {
  return requestClient.get<Response<null>>(
    `/platform_user/delete_platform_user?id=${id}`,
  );
}
export { createEmployee, deleteEmployee, getEmployeeList, updateEmployee };
