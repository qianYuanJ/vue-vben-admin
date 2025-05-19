<script lang="ts" setup>
import type { ImBuyerBusinessSettled } from '@vben/types';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Button } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { payConfirmApi } from '#/api/merchant/audit';

import { usePayConfirmModalFormSchema } from '../data';

const emit = defineEmits(['success']);

const userStore = useUserStore();

const formData = ref<ImBuyerBusinessSettled>();

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: usePayConfirmModalFormSchema(),
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
        ...data,
        id: formData.value?.id,
        pay_status: '已支付',
        operator_user_id: userStore?.userInfo?.id ?? '',
        operator_name: userStore?.userInfo?.nickname ?? '',
      };

      try {
        await payConfirmApi(params);
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<ImBuyerBusinessSettled>();
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
  <Modal title="请输入商家付款信息" class="w-[50vw]">
    <Form class="mx-4" />
    <template #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
  </Modal>
</template>
