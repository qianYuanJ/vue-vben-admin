import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';
/**
 * 弹窗表单
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      rules: 'required',
    },
  ];
}
/**
 * 抽屉表单
 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: $t('system.role.permissions'),
      modelPropName: 'modelValue',
    },
  ];
}
/**
 * 表格
 */
export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      title: $t('system.role.roleName'),
    },
    {
      field: 'created_time',
      title: $t('system.role.createTime'),
      formatter: 'formatDateTime',
    },
    {
      align: 'center',
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 200,
      slots: { default: 'operation' },
    },
  ];
}
