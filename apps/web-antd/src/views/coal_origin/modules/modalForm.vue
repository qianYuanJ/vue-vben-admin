<script lang="ts" setup>
import type { UploadFile } from 'ant-design-vue';

import type { PlatformCoalLocality } from '@vben/types';

import { computed, onBeforeUnmount, ref, toRaw } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { isString } from '@vben/utils';

import { Button } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { updateCoalOrigin } from '#/api';
import { emitter } from '#/emitter';

import { useModalFormSchema } from '../data';

const emit = defineEmits(['success']);

emitter.on('mapPointSelected', (point) => {
  const data = formApi.getValues();
  formApi.setValues({
    ...data,
    ...point,
  });
});
emitter.on('update:upload', (imageUrls) => {
  images.value = imageUrls.join(',');
});
emitter.on('get:coalOrigin', (row) => {
  currentRow.value = row;
});
const currentRow = ref<PlatformCoalLocality>();
const images = ref<string>();

const formData = ref<PlatformCoalLocality>();
const getTitle = computed(() => {
  return formData.value?.id ? '编辑' : '新增';
});

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: useModalFormSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
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
      // 文件处理逻辑，将上传的文件转为字符串数组
      const picture_urls = toRaw(data.picture_urls).map((item: UploadFile) => {
        if (item.url || item.response)
          return item.response ? item.response.url : item.url;
        return isString(item) ? item : '';
      });
      // 视频处理逻辑，将上传的文件转为字符串数组
      const video_url = toRaw(data.video_url).map((item: UploadFile) => {
        if (item.url || item.response)
          return item.response ? item.response.url : item.url;
        return isString(item) ? item : '';
      });

      const params = {
        ...currentRow.value,
        ...data,
        calorific_range: data.calorific_range?.join(','),
        main_operate: data.main_operate?.join(','),
        mining_area: data.mining_area[1],
        picture_urls: picture_urls.join(','),
        video_url: video_url.join(','),
      };

      try {
        await updateCoalOrigin(params);
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<PlatformCoalLocality>();
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

onBeforeUnmount(() => {
  emitter.off('mapPointSelected');
});
</script>

<template>
  <Modal :title="getTitle" class="w-[70vw]">
    <Form class="mx-4" />
    <template #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
  </Modal>
</template>
