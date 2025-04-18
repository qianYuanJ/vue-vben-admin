<script lang="ts" setup>
import type { RoleModel } from '@vben/stores';
import type { MenuModel } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api/system/role1';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteRole, getRoleInfoById, getRoleList } from '#/api/system/role';
import { getUserListByRoleId } from '#/api/user';
import { $t } from '#/locales';

import { useColumns } from './data';
import DrawerForm from './modules/drawerForm.vue';
import ModalForm from './modules/modalForm.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: DrawerForm,
  destroyOnClose: true,
});
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: ModalForm,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => {
          const res = await getRoleList();
          return res.data;
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<SystemRoleApi.SystemRole>,
});

const handleMenuListToPermissions = (
  menuList?: MenuModel[],
  parentPath: string[] = [],
): string[] => {
  if (!menuList || menuList.length === 0) {
    return [];
  }

  const permissions: Set<string> = new Set();

  menuList.forEach((item) => {
    const currentPath = [...parentPath, item.id!];

    if (item.role_menu_id) {
      // 当前节点有权限，加入整个路径上的所有 id
      currentPath.forEach((id) => permissions.add(id));
    }

    if (item.children && item.children.length > 0) {
      const childPermissions = handleMenuListToPermissions(
        item.children,
        currentPath,
      );
      childPermissions.forEach((id) => permissions.add(id));
    }
  });

  return [...permissions];
};

function onPermissionEdit(row: MenuModel) {
  getRoleInfoById(row.id!).then((res) => {
    const permissions = handleMenuListToPermissions(res.data!.menuIdList);
    formDrawerApi.setData({ ...row, permissions }).open();
  });
}

function onEdit(row: SystemRoleApi.SystemRole) {
  formModalApi.setData(row).open();
}

function onCreate() {
  formModalApi.setData({}).open();
}
const onModalFormSuccess = () => {
  gridApi.query();
};

const confirm = (row: RoleModel) => {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  // getUserListByRoleId
  getUserListByRoleId({ roleId: row.id! })
    .then((res) => {
      // 判断逻辑，比如判断是否有员工
      const hasUser = res?.data?.count > 0;

      if (hasUser) {
        // 有员工，不能删，提示一下
        message.warning({
          content: $t('system.role.deleteFieldMsg'),
        });
        // 返回一个 rejected promise 阻止后续执行
        throw new Error('部门成员不为空，无法删除！');
      } else {
        // 没有员工才删除部门
        return deleteRole({ id: row.id! });
      }
    })
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      gridApi.query();
    })
    .catch((error) => {
      console.warn('操作被中断或失败:', error);
      hideLoading();
    });
};
const cancel = () => {};
const getPopupContainer = (el: HTMLElement) => {
  return el.closest('tbody') || document.body;
};
</script>
<template>
  <Page auto-content-height>
    <FormDrawer />
    <FormModal @success="onModalFormSuccess" />
    <Grid :table-title="$t('system.role.list')">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.role.name')]) }}
        </Button>
      </template>
      <template #operation="{ row }">
        <Button size="small" type="link" @click="onEdit(row)">
          {{ $t('common.edit') }}
        </Button>
        <Button size="small" type="link" @click="onPermissionEdit(row)">
          {{ $t('system.role.rolePermissions') }}
        </Button>
        <Popconfirm
          size="small"
          :title="$t('ui.actionTitle.delete', [$t('system.role.name')])"
          @confirm="confirm(row)"
          @cancel="cancel"
          :disabled="row.system_role === 1"
          placement="topLeft"
          :get-popup-container="getPopupContainer"
        >
          <template #description>
            <div class="truncate">
              {{ $t('ui.actionMessage.deleteConfirm', [row.name]) }}
            </div>
          </template>
          <Button
            danger
            size="small"
            type="link"
            :disabled="row.system_role === 1"
          >
            {{ $t('common.delete') }}
          </Button>
        </Popconfirm>
      </template>
    </Grid>
  </Page>
</template>
