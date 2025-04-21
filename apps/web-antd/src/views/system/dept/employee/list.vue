<script lang="ts" setup>
import type { PlatformUser, RequestListParams } from '@vben/types';

import type { OnActionClickParams } from '#/adapter/vxe-table';

import { unref } from 'vue';
import { useRouter } from 'vue-router';

// 员工列表页面 - 用于显示特定部门下的员工列表
import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteEmployee, getEmployeeList } from '#/api/system/dept';

import { useColumns } from './data';
import Form from './form.vue';

const router = useRouter();
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/**
 * 编辑员工
 * @param row
 */
function onEdit(row: PlatformUser) {
  formModalApi
    .setData({ ...row, roles: row.roles ? row.roles.map((r) => r.id) : [] })
    .open();
}
/**
 * 添加员工
 * @param row
 */
function onAppend(row: PlatformUser) {
  formModalApi
    .setData({
      ...row,
      department_id: router.currentRoute.value.query.deptId,
      department_name: router.currentRoute.value.query.deptName,
    })
    .open();
}
/**
 * 删除员工
 * @param row
 */
function onDelete(row: PlatformUser) {
  const hideLoading = message.loading({
    content: `正在删除${row.nickname}`,
    duration: 0,
    key: 'action_process_msg',
  });

  deleteEmployee(row.id!)
    .then(() => {
      refreshGrid();
    })
    .catch(() => {
      hideLoading();
    })
    .finally(() => {
      hideLoading();
    });
}

/**
 * 表格操作按钮的回调函数
 */
function onActionClick({ code, row }: OnActionClickParams<PlatformUser>) {
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
        query: { deptId: row.id },
      });
      break;
    }
  }
}
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    toolbarConfig: {
      custom: true,
      refresh: true,
    },
    proxyConfig: {
      ajax: {
        query: async (params: any) => {
          const apiParams: RequestListParams = {
            page: params.page.currentPage,
            param: [
              {
                field: 'department_id',
                value: router.currentRoute.value.query.deptId,
              },
            ],
            size: params.page.pageSize,
            sort: [],
          };
          const res = await getEmployeeList(apiParams);

          return {
            items: res.results,
            total: res.count,
          };
        },
      },
    },
  },
});

const roleFormatter = (row: any) => {
  // 获取原始 roles 数组
  const roles = unref(row.roles);

  // 提取每个 role 的 name 字段
  const names = roles
    .map((role: any) => {
      const roleObj = unref(role); // 解包每一个 role（ref 或 reactive 都能处理）
      return roleObj?.name;
    })
    .filter((name: string) => !!name); // 去掉空的 name

  return names.join(','); // 拼接成字符串
};

/**
 * 创建新员工
 */
function onCreate() {
  formModalApi.setData(null).open();
}

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
    <Grid table-title="员工列表">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增
        </Button>
      </template>
      <template #sex="{ row }">
        <span>{{ row.sex === '0' ? '女' : '男' }}</span>
      </template>
      <template #roles="{ row }">
        <span>{{ roleFormatter(row) }}</span>
      </template>
    </Grid>
  </Page>
</template>
