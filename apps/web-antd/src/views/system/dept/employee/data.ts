import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';
import type { PlatformUser } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn } from '#/adapter/vxe-table';

import { z } from '#/adapter/form';
import { getRoleList } from '#/api/system/role';
import { $t } from '#/locales';

/**
 * 员工表单字段配置
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'nickname',
      label: $t('system.employee.employeeName'),
      rules: z
        .string()
        .min(
          2,
          $t('ui.formRules.minLength', [$t('system.employee.employeeName'), 2]),
        )
        .max(
          10,
          $t('ui.formRules.maxLength', [
            $t('system.employee.employeeName'),
            20,
          ]),
        ),
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.employee.mobile'),
      rules: z.string().regex(/^1[3-9]\d{9}$/, {
        message: $t('ui.formRules.required', [$t('rule.phone.vailable')]),
      }),
    },
    {
      component: 'RadioGroup',
      fieldName: 'sex',
      label: $t('system.employee.sex'),
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
      label: $t('system.employee.post'),
      rules: z
        .string()
        .min(2, $t('ui.formRules.minLength', [$t('system.employee.post'), 2]))
        .max(
          10,
          $t('ui.formRules.maxLength', [$t('system.employee.post'), 20]),
        ),
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
      label: $t('system.employee.role'),
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
      title: $t('system.employee.employeeName'),
      width: 120,
    },
    {
      field: 'phone',
      title: $t('system.employee.mobile'),
      width: 120,
    },
    {
      field: 'sex',
      title: $t('system.employee.sex'),
      width: 120,
      slots: { default: 'sex' },
    },
    {
      field: 'job',
      title: $t('system.employee.post'),
    },
    {
      field: 'roles',
      title: $t('system.employee.role'),
      slots: { default: 'roles' },
    },
    {
      field: 'create_time',
      title: $t('system.employee.createTime'),
      width: 180,
    },
    {
      align: 'right',

      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.employee.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
      title: $t('system.employee.operation'),
      width: 160,
    },
  ];
}
