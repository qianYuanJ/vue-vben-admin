import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';
import type { PlatformUser } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn } from '#/adapter/vxe-table';

import { z } from '#/adapter/form';
import { getRoleList } from '#/api/system/role';

/**
 * 员工表单字段配置
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'nickname',
      label: '员工姓名',
      rules: z
        .string()
        .min(2, '员工姓名最少2个字符')
        .max(10, '员工姓名最多10个字符'),
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: '手机号码',
      rules: z.string().regex(/^1[3-9]\d{9}$/, {
        message: '手机号码格式不正确',
      }),
    },
    {
      component: 'RadioGroup',
      fieldName: 'sex',
      label: '性别',
      componentProps: {
        options: [
          {
            label: '男',
            value: '1',
          },
          {
            label: '女',
            value: '0',
          },
        ],
      },
      defaultValue: '1',
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      fieldName: 'job',
      label: '岗位',
      rules: z.string().min(2, '岗位最少2个字符').max(10, '岗位最多10个字符'),
    },
    {
      component: 'ApiSelect',
      fieldName: 'roles',
      componentProps: {
        mode: 'multiple',
        api: async () => {
          const res = await getRoleList();
          return res.data;
        },
        class: 'w-full',
        labelField: 'name',
        valueField: 'id',
      },
      label: '角色',
      rules: 'selectRequired',
    },
  ];
}

/**
 * 员工表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
export function useColumns(
  onActionClick?: OnActionClickFn<PlatformUser>,
): VxeTableGridOptions<PlatformUser>['columns'] {
  return [
    {
      field: 'nickname',
      title: '员工姓名',
      width: 120,
    },
    {
      field: 'phone',
      title: '手机号码',
      width: 120,
    },
    {
      field: 'sex',
      title: '性别',
      width: 120,
      slots: { default: 'sex' },
    },
    {
      field: 'job',
      title: '岗位',
    },
    {
      field: 'roles',
      title: '角色',
      slots: { default: 'roles' },
    },
    {
      field: 'create_time',
      title: '创建时间',
      width: 180,
    },
    {
      align: 'right',

      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: '员工姓名',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
      title: '操作',
      width: 160,
    },
  ];
}
