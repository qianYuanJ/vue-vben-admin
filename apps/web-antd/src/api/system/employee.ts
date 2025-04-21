import type {
  PlatformUser,
  RequestListParams,
  Response,
  ResponseList,
} from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemEmployeeApi {
  export interface SystemEmployee {
    [key: string]: any;
    id: string;
    nickname: string;
    phone: string;
    department_id: string;
    department_name: string;
    job: string;
    sex: string;
    role_ids: string[];
  }

  export interface CreateEmployeeApiParams {
    department_id: string;
    department_name: string;
    id?: string;
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
 * 获取部门下员工列表数据
 * @param departmentId 部门ID
 */
async function getDepartmentEmployeeList(departmentId: string) {
  return requestClient.get<Response<PlatformUser[]>>(
    `/platform_user/get_department_users?department_id=${departmentId}`,
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

export {
  createEmployee,
  deleteEmployee,
  getDepartmentEmployeeList,
  getEmployeeList,
  updateEmployee,
};
