<script lang="ts" setup>
import type { MenuModel, Recordable } from '@vben/types';

import { ref, toRaw } from 'vue';

import { useVbenDrawer, VbenTree } from '@vben/common-ui';

import { Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getMenuList, updateRolePermission } from '#/api/system/menu';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emits = defineEmits(['success']);

const formData = ref<MenuModel>();

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

const permissions = ref<MenuModel[]>([]);
const loadingPermissions = ref(false);

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const data = drawerApi.getData<MenuModel>();

    const values = await formApi.getValues();
    const params = {
      role_id: data.id,
      menu_ids: toRaw(values.permissions) ?? [],
    };

    drawerApi.lock();

    updateRolePermission(params)
      .then(() => {
        emits('success');
        drawerApi.close();
      })
      .catch(() => {
        drawerApi.unlock();
      });
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<MenuModel>();
      formApi.resetForm();
      if (data) {
        formData.value = data;
        id.value = data.id;
        formApi.setValues(data);
      } else {
        id.value = undefined;
      }

      if (permissions.value.length === 0) {
        loadPermissions();
      }
    }
  },
});
function convertToVbenMenu(data: MenuModel[]) {
  return data.map((item) => {
    const hasChildren =
      Array.isArray(item.children) && item.children.length > 0;

    const result: any = {
      id: item.id,
      name: item.name!.trim(),
      path: item.path,
      type: hasChildren ? 'catalog' : 'menu',
      status: 1,
      component: item.component || (hasChildren ? undefined : item.path),
      meta: {
        title: item.name!.trim(),
        icon: '#', // 这里可以做个映射表替换真实 icon
      },
    };

    if (hasChildren) {
      result.children = convertToVbenMenu(item.children);
    }

    return result;
  });
}

async function loadPermissions() {
  loadingPermissions.value = true;
  try {
    const res = await getMenuList();
    permissions.value = convertToVbenMenu(res.data!);
  } finally {
    loadingPermissions.value = false;
  }
}

function getNodeClass(node: Recordable<any>) {
  const classes: string[] = [];
  if (node.value?.type === 'button') {
    classes.push('inline-flex');
    if (node.index % 3 >= 1) {
      classes.push('!pl-0');
    }
  }

  return classes.join(' ');
}
</script>
<template>
  <Drawer title="配置">
    <Form>
      <template #permissions="slotProps">
        <Spin :spinning="loadingPermissions" wrapper-class-name="w-full">
          <VbenTree
            :tree-data="permissions"
            multiple
            bordered
            :get-node-class="getNodeClass"
            v-bind="slotProps"
            value-field="id"
            label-field="meta.title"
            icon-field="meta.icon"
          >
            <template #node="{ value }">
              {{ $t(value.meta.title) }}
            </template>
          </VbenTree>
        </Spin>
      </template>
    </Form>
  </Drawer>
</template>
<style lang="css" scoped>
:deep(.ant-tree-title) {
  .tree-actions {
    display: none;
    margin-left: 20px;
  }
}

:deep(.ant-tree-title:hover) {
  .tree-actions {
    display: flex;
    flex: auto;
    justify-content: flex-end;
    margin-left: 20px;
  }
}
</style>
