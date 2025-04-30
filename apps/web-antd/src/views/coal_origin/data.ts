import type { Operation, RequestListParams } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { z } from '#/adapter/form';
import { getDictionaryData } from '#/api/dictionary';
import { emitter } from '#/emitter';

const mapData = ref<any>({});
emitter.on('update:coalOrigin', (row) => {
  mapData.value = row;
});
// 弹窗表单配置
export function useModalFormSchema(): VbenFormSchema[] {
  return [
    // 煤矿名称
    {
      component: 'Input',
      fieldName: 'name',
      label: '煤矿名称',
      rules: 'required',
      help: '此处名称为全称，为避免重复，请核对后再输入',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 煤矿简称
    {
      component: 'Input',
      fieldName: 'short_name',
      label: '煤矿简称',
      rules: 'required',
      help: '简称在创建时为避免重复，请使用格式：地名+ 煤矿名',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 所在矿区
    {
      component: 'ApiCascader',
      fieldName: 'mining_area',
      label: '所在矿区',
      rules: 'required',
      componentProps: {
        api: getDictionaryData('kq'),
        style: {
          width: '80%',
        },
      },
    },
    // 生产状态
    {
      component: 'ApiSelect',
      fieldName: 'produce_status',
      label: '生产状态',
      rules: 'required',
      componentProps: {
        api: getDictionaryData('sczt'),
        style: {
          width: '80%',
        },
      },
    },
    // 开采方式
    {
      fieldName: 'exploit_method',
      label: '开采方式',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: getDictionaryData('kcfs'),
        style: {
          width: '80%',
        },
      },
    },
    // 热值范围
    {
      fieldName: 'calorific_range',
      label: '热值范围',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        mode: 'multiple',
        api: getDictionaryData('rzfw'),
        style: {
          width: '80%',
        },
      },
    },
    // 主要经营
    {
      fieldName: 'main_operate',
      label: '主要经营',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        mode: 'multiple',
        api: getDictionaryData('zyjy'),
        style: {
          width: '80%',
        },
      },
    },
    // 地图选择
    {
      fieldName: 'map',
      label: '地图位置',
      component: 'Map',
      componentProps: {
        mapDataProps: mapData.value,
      },
    },
    // 经度
    {
      fieldName: 'longitude',
      label: '经度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 纬度
    {
      fieldName: 'latitude',
      label: '纬度',
      rules: 'required',
      component: 'Input',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 省
    {
      fieldName: 'province',
      label: '省/自治区',
      rules: 'required',
      component: 'Input',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 市
    {
      fieldName: 'city',
      label: '市',
      rules: 'required',
      component: 'Input',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 区
    {
      fieldName: 'district',
      label: '旗/县/区',
      rules: 'required',
      component: 'Input',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 详细地址
    {
      fieldName: 'address',
      label: '详细地址',
      rules: 'required',
      component: 'Textarea',
      componentProps: {
        style: {
          width: '80%',
        },
      },
    },
    // 煤矿简介
    {
      fieldName: 'summary',
      label: '煤矿简介',
      rules: 'required',
      component: 'Textarea',
      componentProps: {
        style: {
          width: '90%',
        },
      },
      formItemClass: 'col-span-2',
    },
    // 所属企业
    {
      fieldName: 'affiliation_company',
      label: '所属企业',
      component: 'Input',
      componentProps: {
        allowClear: true,
        style: {
          width: '80%',
        },
      },
    },
    // 企业性质
    {
      component: 'Select',
      fieldName: 'company_nature',
      label: '企业性质',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '民营',
            value: '民营',
          },
          {
            label: '国企',
            value: '国企',
          },
          {
            label: '央企',
            value: '央企',
          },
        ],
        style: {
          width: '80%',
        },
      },
    },
    // 年产能
    {
      fieldName: 'year_capacity',
      label: '年产能',
      component: 'InputNumber',
      componentProps: {
        allowClear: true,
        style: {
          width: '80%',
        },
      },
      suffix: () => '吨',
    },
    // 设计产能
    {
      fieldName: 'design_capacity',
      label: '设计产能',
      component: 'InputNumber',
      componentProps: {
        allowClear: true,
        style: {
          width: '80%',
        },
      },
      suffix: () => '吨',
    },
    // 预计挖完时间
    {
      fieldName: 'expected_over_time',
      label: '预计挖完时间',
      component: 'InputNumber',
      componentProps: {
        allowClear: true,
        style: {
          width: '80%',
        },
      },
      suffix: () => '年',
    },
    // 联系人
    {
      fieldName: 'contact',
      label: '联系人',
      component: 'Input',
      componentProps: {
        allowClear: true,
        style: {
          width: '80%',
        },
      },
    },
    // 联系电话
    {
      fieldName: 'contact_phone',
      label: '联系电话',
      component: 'Input',
      help: '为使数据完善，请输入正确手机号',
      componentProps: {
        allowClear: true,
        style: {
          width: '80%',
        },
      },
      rules: z
        .string()
        .regex(
          /^(?:(?:\+|00)86)?1(?:3\d|4[5-79]|5[0-35-9]|6[5-7]|7[0-8]|8\d|9[1589])\d{8}$/,
          '联系人手机号格式不正确',
        )
        .optional()
        .or(z.literal('')),
    },
    // 是否完成智能化建设
    {
      component: 'Switch',
      fieldName: 'intelligent',
      label: '是否完成智能化建设',
      componentProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
      defaultValue: false,
    },
    // 绿色矿山等级
    {
      component: 'Select',
      fieldName: 'producer_grade',
      label: '绿色矿山等级',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '自治区/省级',
            value: '自治区/省级',
          },
          {
            label: '国家级',
            value: '国家级',
          },
        ],
        style: {
          width: '80%',
        },
      },
    },
    // 备注
    {
      fieldName: 'remarks',
      label: '备注',
      component: 'Textarea',
      componentProps: {
        style: {
          width: '90%',
        },
      },
      formItemClass: 'col-span-2',
    },
    // 图片
    {
      fieldName: 'picture_urls',
      label: '图片',
      component: 'FileUpload',
      help: '图片大小最大为5MB/每张，为展统一请上传16:9图片',
      componentProps: {
        maxCount: 5,
        fileSizeLimit: 5,
      },
    },
    // 视频
    {
      fieldName: 'video_url',
      label: '视频',
      component: 'FileUpload',
      help: '视频大小最大为20MB，只能上传1个',
      componentProps: {
        fileType: 'video',
        fileSizeLimit: 20,
        maxCount: 1,
      },
    },
  ];
}

// 搜索表单配置
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: '煤矿名称',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: getDictionaryData('sczt'),
      },
      fieldName: 'produce_status',
      label: '生产状态',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        allowClear: true,
        api: getDictionaryData('kcfs'),
      },
      fieldName: 'exploit_method',
      label: '开采方式',
    },
  ];
}
// 表格列配置
export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      title: '煤矿名称',
    },
    {
      field: 'short_name',
      title: '煤矿简称',
    },
    {
      field: 'produce_status',
      title: '生产状态',
    },
    {
      field: 'exploit_method',
      title: '开采方式',
    },
    {
      field: 'calorific_range',
      title: '热值范围',
    },
    {
      field: 'address',
      title: '详细地址',
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
  name: '%',
  produce_status: '=',
  exploit_method: '=',
};
// 处理请求参数
export const requestParamsHandler = ({
  formValues,
  params,
}: {
  formValues: any;
  params: RequestListParams;
}): RequestListParams => {
  const result = params;

  for (const key in formValues) {
    if (formValues[key] && !Array.isArray(formValues[key])) {
      result.param.push({
        field: key,
        value: formValues[key],
        operation: OperationMap[key],
      });
    }
  }
  return result;
};

export type CascaderOption = {
  children?: CascaderOption[];
  label: string;
  value: string;
};

// 处理所在矿区的默认选中
export function findCascaderPathByKey<T extends Record<string, any>>(
  tree: T[],
  key: keyof T,
  targetValue: any,
  childrenKey: keyof T = 'children',
  path: any[] = [],
): any[] {
  for (const node of tree) {
    const currentPath = [...path, node[key]];
    if (node[key] === targetValue) {
      return currentPath;
    }
    if (Array.isArray(node[childrenKey])) {
      const result = findCascaderPathByKey(
        node[childrenKey],
        key,
        targetValue,
        childrenKey,
        currentPath,
      );
      if (result.length > 0) return result;
    }
  }
  return [];
}

// 处理多选的默认选中
export const handleMultipleSelected = (value: string): string[] =>
  value.split(',');
