import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

// 弹窗表单配置
export function useModalFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'summarize_content',
      label: '煤质综述',
      component: 'Textarea',
    },
  ];
}

// 搜索表单配置
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'type',
      label: '类型',
      component: 'Select',
      defaultValue: '原煤', // 默认选中原煤
      componentProps: {
        options: [
          {
            label: '原煤',
            value: '原煤',
          },
          {
            label: '粉煤',
            value: '粉煤',
          },
          {
            label: '块煤',
            value: '块煤',
          },
          {
            label: '煤泥',
            value: '煤泥',
          },
          {
            label: '矸石',
            value: '矸石',
          },
        ],
      },
    },
  ];
}

// 表格列配置
export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'type',
      title: '类型',
    },
    {
      field: 'summarize_content',
      title: '煤质综述',
    },
    {
      field: 'create_time',
      title: '创建时间',
    },
  ];
}
