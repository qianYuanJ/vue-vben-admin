import type { Operation, RequestListParams } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { unref } from 'vue';

import dayjs from 'dayjs';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '角色名称',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: '已启用', value: 1 },
          { label: '已禁用', value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: '状态',
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
    },
    {
      component: 'Input',
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: '权限',
      modelPropName: 'modelValue',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'operate_phone',
      label: '操作账号',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 200, value: '200' },
          { label: 401, value: '401' },
          { label: 403, value: '403' },
          { label: 404, value: '404' },
          { label: 500, value: '500' },
        ],
      },
      fieldName: 'operate_state',
      label: '操作结果',
    },
    {
      component: 'RangePicker',
      fieldName: 'create_time',
      label: '操作时间',
      componentProps: {
        showTime: true,
      },
    },
  ];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'operate_type',
      title: '操作类型',
      width: 200,
    },
    {
      field: 'operate_phone',
      title: '操作账号',
      width: 200,
    },
    {
      field: 'operate_state',
      minWidth: 100,
      title: '操作结果',
    },
    {
      field: 'create_time',
      title: '操作时间',
      width: 200,
      formatter: 'formatDateTime',
    },
    {
      align: 'center',
      field: 'operation',
      fixed: 'right',
      title: '操作',
      slots: { default: 'operation' },
    },
  ];
}

// 查询参数的匹配模式
export const OperationMap: Record<string, Operation> = {
  operate_phone: '%',
  operate_state: '=',
  create_time: '=',
};
// 处理请求参数，create_time需要特殊处理
export const requestParamsHandler = ({
  formValues,
  params,
}: {
  formValues: any;
  params: RequestListParams;
}) => {
  const result = params;

  for (const key in formValues) {
    if (formValues[key] && !Array.isArray(formValues[key])) {
      result.param.push({
        field: key,
        value: formValues[key],
        operation: OperationMap[key],
      });
    }
    if (formValues[key] && key === 'create_time') {
      const [start, end] = unref(formValues.create_time) || [];
      const startTime = dayjs(unref(start)).format('YYYY-MM-DD HH:mm:ss');
      const endTime = dayjs(unref(end)).format('YYYY-MM-DD HH:mm:ss');
      result.param.push(
        {
          field: key,
          value: startTime,
          operation: '>=',
        },
        {
          field: key,
          value: endTime,
          operation: '<=',
        },
      );
    }
  }
  return result;
};
