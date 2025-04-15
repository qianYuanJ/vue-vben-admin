<script lang="ts" setup>
import type { PlatformUser } from '@vben/types';

import type { SystemDeptApi, SystemEmployeeApi } from '#/api/system/dept';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createEmployee, updateEmployee } from '#/api/system/dept';
import { $t } from '#/locales';

import { useSchema } from './data';

const emit = defineEmits(['success']);
const formData = ref<PlatformUser>();
const router = useRouter();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.employee.name')])
    : $t('ui.actionTitle.create', [$t('system.employee.name')]);
});

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: useSchema(),
  showDefaultActions: false,
});

function resetForm() {
  formApi.resetForm();
  formApi.setValues(formData.value || {});
}

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const row = modalApi.getData();

      const data = await formApi.getValues();
      const createParams: SystemEmployeeApi.CreateEmployeeApiParams = {
        ...(data as SystemEmployeeApi.CreateEmployeeApiParams),
        department_id: router.currentRoute.value.query.deptId as string,
        department_name: router.currentRoute.value.query.deptName as string,
        role_ids: data.roles,
        roles: undefined,
      };
      const updateParams: SystemEmployeeApi.CreateEmployeeApiParams = {
        ...row,
        ...createParams,
      };
      try {
        await (formData.value?.id
          ? updateEmployee(updateParams)
          : createEmployee(createParams));
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SystemDeptApi.SystemDept>();
      if (data) {
        if (data.pid === 0) {
          data.pid = undefined;
        }
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
});
</script>

<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
    <template #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm">
          {{ $t('common.reset') }}
        </Button>
      </div>
    </template>
  </Modal>
</template>
