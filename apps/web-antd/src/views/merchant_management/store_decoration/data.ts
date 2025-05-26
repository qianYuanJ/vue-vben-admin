import type { Operation, RequestListParams } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { getBaseDictionaryData } from '#/api/dictionary';

// 审核 弹窗表单配置
export function useModalFormSchema(): VbenFormSchema[] {
  return [
    // 店铺信息 分割线
    {
      fieldName: 'store-info',
      component: 'CustomDivider',
      label: '',
      componentProps: {
        children: '店铺信息',
      },
      formItemClass: 'col-span-2',
    },
    // 商家名称
    {
      fieldName: 'seller_name',
      component: 'Input',
      label: '商家名称',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 商家类型
    {
      component: 'Select',
      fieldName: 'type',
      label: '商家类型',
      componentProps: {
        disabled: true,
        options: [
          {
            label: '个人',
            value: 1,
          },
          {
            label: '个体工商户',
            value: 2,
          },
          {
            label: '企业',
            value: 3,
          },
        ],
        style: {
          width: '80%',
        },
      },
    },
    // 联系人电话
    {
      fieldName: 'contacts_phone',
      component: 'Input',
      label: '联系人电话',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 店铺简介
    {
      fieldName: 'shop_introduction',
      component: 'Textarea',
      label: '店铺简介',
      componentProps: {
        disabled: true,
        style: {
          width: '90%',
        },
      },
      formItemClass: 'col-span-2',
    },
    // 品质保障
    {
      fieldName: 'quality_assurance',
      component: 'Input',
      label: '品质保障',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 其他保障
    {
      fieldName: 'assurance_other',
      component: 'Input',
      label: '其他保障',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 店铺图标
    {
      fieldName: 'seller_icon',
      component: 'CustomImage',
      label: '店铺图标',
      componentProps: {
        style: {
          maxWidth: '200px',
          maxHeight: '200px',
        },
      },
    },
    // 宣传图片
    {
      fieldName: 'promotional_images',
      component: 'CustomImage',
      label: '宣传图片',
      componentProps: {
        style: {
          maxWidth: '200px',
          maxHeight: '200px',
        },
      },
    },
    // 宣传视频
    {
      fieldName: 'promotion_video',
      component: 'CustomVideo',
      label: '宣传视频',
      componentProps: {
        controls: true,
        style: {
          minWidth: '320px',
          maxHeight: '180px',
        },
      },
    },
  ];
}

// 审核 设置标签表单
export function useSetTagModalFormSchema(): VbenFormSchema[] {
  const MAX_TAGS = 3;
  return [
    {
      component: 'ApiSelect',
      fieldName: 'seller_label',
      label: '标签',
      rules: 'required',
      componentProps: (formModel) => ({
        api: getBaseDictionaryData('dpbq'),
        mode: 'multiple',
        onChange: (value: string[]) =>
          value.length > MAX_TAGS
            ? (formModel.seller_label = value.slice(0, MAX_TAGS))
            : (formModel.seller_label = value),
        style: {
          minWidth: '80%',
        },
      }),
    },
  ];
}

// 搜索表单配置
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'seller_name',
      label: '商家名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: '待审核',
            value: '待审核',
          },
          {
            label: '已通过',
            value: '已通过',
          },
          {
            label: '待商家修改',
            value: '待商家修改',
          },
        ],
      },
      fieldName: 'examine_status',
      label: '审核状态',
    },
  ];
}
// 表格列配置
export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'seller_name',
      title: '商家名称',
    },
    {
      field: 'self_support',
      title: '商家类型',
    },
    {
      field: 'contacts_phone',
      title: '联系人电话',
    },
    {
      field: 'shop_introduction',
      title: '店铺简介',
    },
    {
      field: 'quality_assurance',
      title: '品质保障',
    },
    {
      field: 'seller_icon',
      title: '店铺图标',
      cellRender: { name: 'CellImage' },
    },
    {
      field: 'examine_status',
      title: '审核状态',
    },
    {
      field: 'create_time',
      title: '素材提交时间',
    },
    {
      field: 'operation',
      align: 'left',
      fixed: 'right',
      title: '操作',
      slots: { default: 'operation' },
      width: 170,
    },
  ];
}

// 查询参数的匹配模式
export const OperationMap: Record<string, Operation> = {
  seller_name: '%',
  examine_status: '=',
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
