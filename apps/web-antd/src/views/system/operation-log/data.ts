import type { Operation, RequestListParams } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { unref } from 'vue';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: $t('system.role.status'),
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.role.remark'),
    },
    {
      component: 'Input',
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: $t('system.role.setPermissions'),
      modelPropName: 'modelValue',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'operate_phone',
      label: $t('system.operationLog.phone'),
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
      label: $t('system.operationLog.state'),
    },
    {
      component: 'RangePicker',
      fieldName: 'create_time',
      label: $t('system.operationLog.time'),
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
      title: $t('system.operationLog.type'),
      width: 200,
    },
    {
      field: 'operate_phone',
      title: $t('system.operationLog.phone'),
      width: 200,
    },
    {
      field: 'operate_state',
      minWidth: 100,
      title: $t('system.operationLog.state'),
    },
    {
      field: 'create_time',
      title: $t('system.operationLog.time'),
      width: 200,
      formatter: 'formatDateTime',
    },
    {
      align: 'center',
      field: 'operation',
      fixed: 'right',
      title: $t('system.operationLog.operation'),
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
