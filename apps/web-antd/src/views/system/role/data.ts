import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

/**
 * 弹窗表单
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '角色名称',
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
      label: '权限',
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
      title: '角色名称',
    },
    {
      field: 'created_time',
      title: '创建时间',
      formatter: 'formatDateTime',
    },
    {
      align: 'center',
      field: 'operation',
      fixed: 'right',
      title: '操作',
      width: 200,
      slots: { default: 'operation' },
    },
  ];
}
