import type { Operation, RequestListParams } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { unref } from 'vue';

import dayjs from 'dayjs';

// 表单筛选字段配置
export function useGridFormSchema(appList: any[]): VbenFormSchema[] {
  return [
    {
      component: 'Select',
      fieldName: 'app_type',
      label: '应用',
      defaultValue: 'mms', // 默认选中煤贸商城
      componentProps: {
        allowClear: false,
        options: appList.map((app) => ({
          label: app.name,
          value: app.key,
        })),
      },
    },
    {
      component: 'Select',
      fieldName: 'package_type',
      label: '包类型',
      componentProps: {
        allowClear: true,
        options: [
          { label: '安装包', value: '0' },
          { label: '资源包', value: '1' },
        ],
      },
    },
  ];
}

// 表格列定义
export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'application_name',
      title: '应用名称',
      minWidth: 120,
    },
    {
      field: 'package_type',
      title: '包类型',
      width: 100,
      formatter: ({ cellValue }) => {
        const typeMap: Record<string, string> = {
          '0': '安装包',
          '1': '资源包',
        };
        const value = cellValue as string;
        return typeMap[value] || value;
      },
    },
    {
      field: 'edition_type',
      title: 'APPID',
      minWidth: 150,
      showOverflow: true,
    },
    {
      field: 'edition_name',
      title: '版本号',
      minWidth: 100,
    },
    {
      field: 'edition_issue',
      title: '是否发行',
      width: 100,
      formatter: ({ cellValue }) => (cellValue ? '是' : '否'),
    },
    {
      field: 'create_time',
      title: '创建时间',
      width: 180,
      formatter: ({ cellValue }) => {
        if (!cellValue) return '';
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      field: 'operation',
      title: '操作',
      width: 180,
      fixed: 'right',
      slots: { default: 'operation' },
    },
  ];
}

// 查询参数的匹配模式
export const OperationMap: Record<string, Operation> = {
  edition_name: '%',
  version_type: '=',
  edition_force: '=',
  edition_issue: '=',
  create_time: '=',
  edition_type: '=',
};

// 处理请求参数处理器
export const requestParamsHandler = ({
  formValues,
  params,
  appList,
}: {
  appList: any[];
  formValues: any;
  params: RequestListParams;
}) => {
  const result = { ...params };
  result.param = [];

  // 根据应用类型查询对应的应用editionType
  if (formValues.app_type) {
    const selectedApp = appList.find((app) => app.key === formValues.app_type);
    if (selectedApp) {
      result.param.push({
        field: 'edition_type',
        value: selectedApp.editionType,
        operation: OperationMap.edition_type,
      });
    }
  }

  // 处理其他表单字段
  for (const key in formValues) {
    if (
      formValues[key] &&
      !Array.isArray(formValues[key]) &&
      key !== 'create_time' &&
      key !== 'app_type'
    ) {
      result.param.push({
        field: key,
        value: formValues[key],
        operation: OperationMap[key],
      });
    }

    // 特殊处理日期范围
    if (formValues[key] && key === 'create_time') {
      const [start, end] = unref(formValues.create_time) || [];
      if (start && end) {
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
  }

  return result;
};

/**
 * 编辑/创建版本表单配置
 */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'edition_type',
      label: 'APPID',
      rules: 'required',
      componentProps: {
        placeholder: '请输入应用APPID',
        style: {
          width: '80%',
        },
      },
    },
    {
      component: 'Select',
      fieldName: 'version_type',
      label: '版本类型',
      componentProps: {
        allowClear: false,
        options: [
          { label: 'Android', value: 'android' },
          { label: 'iOS', value: 'ios' },
        ],
        style: {
          width: '80%',
        },
      },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'application_name',
      label: '应用名称',
      rules: 'required',
      componentProps: {
        placeholder: '请输入应用名称',
        style: {
          width: '80%',
        },
      },
    },
    {
      component: 'Switch',
      fieldName: 'edition_force',
      label: '强制更新',
      componentProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      defaultValue: false,
    },
    {
      component: 'Input',
      fieldName: 'edition_name',
      label: '版本名称',
      rules: 'required',
      componentProps: {
        placeholder: '请输入版本名称，如：1.0.0',
        style: {
          width: '80%',
        },
      },
    },
    {
      component: 'Switch',
      fieldName: 'edition_issue',
      label: '是否发行',
      componentProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      defaultValue: false,
    },
    {
      component: 'Input',
      fieldName: 'edition_number',
      label: '版本号',
      rules: 'required',
      componentProps: {
        placeholder: '请输入版本号',
        style: {
          width: '80%',
        },
      },
    },
    {
      component: 'Select',
      fieldName: 'package_type',
      label: '包类型',
      componentProps: {
        allowClear: false,
        options: [
          { label: '安装包', value: '0' },
          { label: '资源包', value: '1' },
        ],
        style: {
          width: '80%',
        },
      },
      rules: 'required',
    },
    {
      component: 'Switch',
      fieldName: 'edition_silence',
      label: '静默更新',
      componentProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      defaultValue: false,
    },
    {
      component: 'Textarea',
      fieldName: 'edition_url',
      label: '下载链接',
      rules: 'required',
      componentProps: {
        placeholder: '请输入应用下载地址',
        rows: 2,
      },
      formItemClass: 'col-span-2',
    },
    {
      component: 'Textarea',
      fieldName: 'describe',
      label: '更新内容',
      rules: 'required',
      componentProps: {
        placeholder: '请输入本次更新的内容描述',
        rows: 4,
      },
      formItemClass: 'col-span-2',
    },
  ];
}
