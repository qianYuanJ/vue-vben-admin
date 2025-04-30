<script lang="ts" setup>
import type { AppVersionModel } from '#/api/system/app-version';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { createAppVersion, updateAppVersion } from '#/api/system/app-version';

import { useFormSchema } from '../data';

interface AppConfig {
  key: string;
  name: string;
  editionType: string;
  isLogistics?: boolean;
}

const emit = defineEmits(['success']);
const formData = ref<AppVersionModel>();
const appList = ref<AppConfig[]>([
  { key: 'mms', name: '煤贸商城', editionType: '__UNI__B128014' },
  { key: 'collect', name: '煤贸信息采集', editionType: '__UNI__F73D3E4' },
  { key: 'business', name: '煤贸商家', editionType: '__UNI__6C01461' },
  { key: 'group', name: '煤贸集团', editionType: '__UNI__ED4038E' },
  {
    key: 'logistics_store',
    name: '物流门店',
    editionType: '__UNI__67B1B7B',
    isLogistics: true,
  },
  {
    key: 'logistics_driver',
    name: '物流司机',
    editionType: '__UNI__D3BA5FE',
    isLogistics: true,
  },
]);

const getTitle = computed(() => {
  return formData.value?.id ? '编辑应用版本' : '新建应用版本';
});

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: useFormSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

function resetForm() {
  formApi.resetForm();
}

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const values = await formApi.getValues();

      try {
        // 获取应用类型对应的是否为物流应用
        const selectedApp = appList.value.find(
          (app) => app.editionType === values.edition_type,
        );
        const isLogistics = selectedApp?.isLogistics || false;

        // 构建提交参数
        const params: AppVersionModel = {
          ...values,
          // 确保 boolean 类型正确
          edition_force: !!values.edition_force,
          edition_issue: !!values.edition_issue,
          edition_silence: !!values.edition_silence,
          // 确保 package_type 是字符串
          package_type: String(values.package_type),
          // 确保包含所有必需的属性
          edition_name: values.edition_name,
          edition_url: values.edition_url,
          describe: values.describe,
          version_type: values.version_type,
          edition_type: values.edition_type,
          application_name: values.application_name,
        };

        // 如果是编辑，添加ID
        if (formData.value?.id) {
          params.id = formData.value.id;
        }

        // 提交请求
        await (formData.value?.id
          ? updateAppVersion(params, isLogistics)
          : createAppVersion(params, isLogistics));

        modalApi.close();
        emit('success');
      } catch (error) {
        console.error('操作失败', error);
      } finally {
        modalApi.lock(false);
      }
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<AppVersionModel>();
      formData.value = data;

      if (data?.id) {
        // 编辑模式：直接使用数据
        formApi.setValues(data);
      } else {
        // 新建模式：设置默认值
        formApi.resetForm();
        formApi.setValues(data);
      }
    }
  },
});
</script>

<template>
  <Modal :title="getTitle" class="w-[50vw]">
    <Form class="px-4" />
    <template #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
  </Modal>
</template>
