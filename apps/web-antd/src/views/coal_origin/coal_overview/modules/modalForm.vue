<script lang="ts" setup>
import type { PlatformSummarize, PlatformSummarizeParams } from '@vben/types';

import { computed, ref, unref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createCoalOverview } from '#/api/coal_origin';

import { useModalFormSchema } from '../data';

const emit = defineEmits(['success']);

const formData = ref<PlatformSummarizeParams>();
const getTitle = computed(() => {
  return `新增 ${formData.value?.type} 煤质综述`;
});

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: useModalFormSchema(),
  showDefaultActions: false,
});

function resetForm() {
  formApi.resetForm();
  formApi.setValues(formData.value || {});
}

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    const data = await formApi.getValues();
    const params = {
      ...data,
      ...unref(formData.value!),
    };
    if (valid) {
      modalApi.lock();
      try {
        await createCoalOverview(params);
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<PlatformSummarize>();
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
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
  </Modal>
</template>
