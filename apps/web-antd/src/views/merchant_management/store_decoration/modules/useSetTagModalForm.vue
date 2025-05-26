<script lang="ts" setup>
import type { SellerCompanyManage } from '@vben/types';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { updateTag } from '#/api/merchant/store_decoration';

import { useSetTagModalFormSchema } from '../data';

const emit = defineEmits(['success']);

const formData = ref<SellerCompanyManage>();

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: useSetTagModalFormSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1',
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
      const data = await formApi.getValues();

      const params = {
        id: formData.value?.id ?? '',
        seller_label: data.seller_label.join(','),
      };

      try {
        await updateTag(params);
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SellerCompanyManage>();
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
  <Modal title="设置标签">
    <Form class="mx-4" />
    <template #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
  </Modal>
</template>
