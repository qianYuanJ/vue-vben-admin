<script lang="ts" setup>
import type { DepartmentModel } from '@vben/types';

import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDept, getDeptList, getEmployeeList } from '#/api/system/dept';
import { $t } from '#/locales';

import { useColumns } from './data';
import Form from './form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const router = useRouter();

/**
 * 编辑部门
 * @param row
 */
function onEdit(row: DepartmentModel) {
  formModalApi.setData(row).open();
}

/**
 * 添加下级部门
 * @param row
 */
function onAppend(row: DepartmentModel) {
  formModalApi.setData({ parent_id: row.id }).open();
}

/**
 * 创建新部门
 */
function onCreate() {
  formModalApi.setData(null).open();
}

/**
 * 删除部门
 * @param row
 */
function onDelete(row: DepartmentModel) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  const employeeParams = {
    page: 1,
    size: 10,
    param: [{ field: 'department_id', value: row.id }],
    sort: [],
  };
  getEmployeeList(employeeParams)
    .then((res) => {
      // 判断逻辑，比如判断是否有员工
      const hasEmployees = res?.results?.length > 0;

      if (hasEmployees) {
        // 有员工，不能删，提示一下
        message.warning({
          content: $t('system.dept.deleteFieldMsg'),
        });
        // 返回一个 rejected promise 阻止后续执行
        throw new Error('部门成员不为空，无法删除！');
      } else {
        // 没有员工才删除部门
        return deleteDept({ id: row.id });
      }
    })
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      refreshGrid();
    })
    .catch((error) => {
      console.warn('操作被中断或失败:', error);
      hideLoading();
    });
}

/**
 * 表格操作按钮的回调函数
 */
function onActionClick({ code, row }: OnActionClickParams<DepartmentModel>) {
  switch (code) {
    case 'append': {
      onAppend(row);
      break;
    }
    case 'delete': {
      onDelete(row);
      break;
    }
    case 'edit': {
      onEdit(row);
      break;
    }
    case 'employees': {
      // 跳转到员工管理页面，携带部门ID参数
      router.push({
        path: `/system/dept/employee`,
        query: { deptId: row.id, deptName: row.name },
      });
      break;
    }
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {},
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async (_params) => {
          const res = await getDeptList();
          return res.data;
        },
      },
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      zoom: true,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: false,
    },
  } as VxeTableGridOptions,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid table-title="部门列表">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.dept.name')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
