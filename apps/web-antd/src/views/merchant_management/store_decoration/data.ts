import type { Operation, RequestListParams } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

// 审核 弹窗表单配置
export function useModalFormSchema(): VbenFormSchema[] {
  return [
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
    // 营业证件信息 分割线
    {
      fieldName: 'divider-info',
      component: 'CustomDivider',
      label: '',
      componentProps: {
        children: '营业证件信息',
      },
      dependencies: {
        if(values) {
          return values.type === 3;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['type'],
      },
      formItemClass: 'col-span-2',
    },
    // 营业执照
    {
      fieldName: 'business_license_photo',
      component: 'CustomImage',
      label: '营业执照',
      componentProps: {
        style: {
          maxWidth: '200px',
          maxHeight: '200px',
        },
      },
      dependencies: {
        if(values) {
          return values.type === 3;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['type'],
      },
      formItemClass: 'col-span-2',
    },
    // 企业名称
    {
      fieldName: 'name',
      component: 'Input',
      label: '企业名称',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
      dependencies: {
        if(values) {
          return values.type === 3;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['type'],
      },
    },

    // 统一社会信用代码
    {
      fieldName: 'company_union_id',
      component: 'Input',
      label: '统一社会信用代码',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
      dependencies: {
        if(values) {
          return values.type === 3;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['type'],
      },
    },
    // 经营地址
    {
      fieldName: 'ship_address',
      component: 'Input',
      label: '经营地址',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 详细地址
    {
      fieldName: 'address',
      component: 'Input',
      label: '详细地址',
      componentProps: {
        disabled: true,
        style: {
          width: '90%',
        },
      },
      formItemClass: 'col-span-2',
    },
    // 法定代表人信息 分割线
    {
      fieldName: 'divider-info',
      component: 'CustomDivider',
      label: '',
      componentProps: {
        children: '法定代表人信息',
      },
      dependencies: {
        if(values) {
          return values.type === 3;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['type'],
      },
      formItemClass: 'col-span-2',
    },
    // 身份证正面
    {
      fieldName: 'id_card_photo_a',
      component: 'CustomImage',
      label: '身份证正面',
      componentProps: {
        style: {
          maxWidth: '200px',
          maxHeight: '200px',
        },
      },
    },
    // 身份证背面
    {
      fieldName: 'id_card_photo_b',
      component: 'CustomImage',
      label: '身份证背面',
      componentProps: {
        style: {
          maxWidth: '200px',
          maxHeight: '200px',
        },
      },
    },
    // 店铺信息 分割线
    {
      fieldName: 'divider-info',
      component: 'CustomDivider',
      label: '',
      componentProps: {
        children: '店铺信息',
      },
      dependencies: {
        if(values) {
          return values.type === 3;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['type'],
      },
      formItemClass: 'col-span-2',
    },
    // 商家名称
    {
      fieldName: 'name',
      component: 'Input',
      label: '商家名称',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 注册人手机号
    {
      fieldName: 'contacts_phone',
      component: 'Input',
      label: '注册人手机号',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 服务费用约定 分割线
    {
      fieldName: 'divider-info',
      component: 'CustomDivider',
      label: '',
      componentProps: {
        children: '服务费用约定',
      },
      formItemClass: 'col-span-2',
    },
    // 服务包费
    {
      fieldName: 'service_fee',
      component: 'InputNumber',
      label: '服务包费',
      componentProps: {
        addonAfter: '元/车',
        style: {
          width: '80%',
        },
      },
    },
    // 信息技术服务费
    {
      fieldName: 'information_fee',
      component: 'InputNumber',
      label: '信息技术服务费',
      componentProps: {
        addonAfter: '元/吨',
        style: {
          width: '80%',
        },
      },
    },
    // 服务类型
    {
      fieldName: 'RadioGroup',
      label: '服务类型',
      component: 'RadioGroup',
      componentProps: {
        style: {
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
      formItemClass: 'col-span-2',
    },
    // 申请时间
    {
      fieldName: 'create_time',
      component: 'Input',
      label: '申请时间',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 最近处理时间
    {
      fieldName: 'updated_time',
      component: 'Input',
      label: '最近处理时间',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 开店时间
    {
      fieldName: 'opening_time',
      component: 'Input',
      label: '开店时间',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 店铺到期时间
    {
      fieldName: 'expiration_time',
      component: 'Input',
      label: '店铺到期时间',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 订单信息 分割线
    {
      fieldName: 'divider-info',
      component: 'CustomDivider',
      label: '',
      componentProps: {
        children: '订单信息',
      },
      formItemClass: 'col-span-2',
    },
    // 订单期限
    {
      fieldName: 'order_time',
      component: 'Input',
      label: '订单期限',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 支付状态
    {
      fieldName: 'pay_status',
      component: 'Input',
      label: '订单期限',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
    },
    // 订单价格
    {
      fieldName: 'payment_amount_all',
      component: 'Input',
      label: '订单价格',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue(
            'payment_amount_all',
            values.RadioGroup === 1 ? 50_000 : 29_800,
          );
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['RadioGroup'],
      },
    },
    // 优惠金额
    {
      fieldName: 'discount_price',
      component: 'InputNumber',
      label: '优惠金额',
      componentProps: {
        addonAfter: '元/年',
        style: {
          width: '80%',
        },
      },
    },
    // 实付价格
    {
      fieldName: 'payment_amount',
      component: 'Input',
      label: '实付价格',
      componentProps: {
        disabled: true,
        style: {
          width: '80%',
        },
      },
      dependencies: {
        trigger(values, form) {
          form.setFieldValue(
            'payment_amount',
            Math.max(0, values.payment_amount_all - values.discount_price),
          );
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['discount_price', 'payment_amount_all'],
      },
    },
  ];
}

// 审核 弹窗表单配置
export function usePayConfirmModalFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'payee_name',
      label: '付款人',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'bank_deposit_name',
      label: '开户行名称',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'bank_card_no',
      label: '银行卡号',
      rules: 'required',
    },
  ];
}

// 搜索表单配置
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
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
      align: 'left',
      field: 'operation',
      fixed: 'right',
      title: '操作',
      slots: { default: 'operation' },
      width: 230,
    },
  ];
}

// 查询参数的匹配模式
export const OperationMap: Record<string, Operation> = {
  name: '%',
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
