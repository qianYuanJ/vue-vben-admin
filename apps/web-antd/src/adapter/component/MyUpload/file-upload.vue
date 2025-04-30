<script setup lang="ts">
import type { UploadFile, UploadProps } from 'ant-design-vue';
import type { UploadRequestOption as RcCustomRequestOptions } from 'ant-design-vue/es/vc-upload/interface';

import type { PropType } from 'vue';

import { computed, onBeforeMount, ref, unref } from 'vue';

import { AdvPlusOutlined } from '@vben/icons';

import { watchOnce } from '@vueuse/core';
import { message, Upload } from 'ant-design-vue';

import { localGetOssSecurityToken, multipartUpload } from '#/utils/upload';

const props = defineProps({
  // 上传的文件类型
  fileType: {
    type: String as PropType<'image' | 'video'>,
    default: 'image',
  },
  // 上传文件数量限制
  maxCount: {
    type: Number,
    default: 1,
  },
  // 上传列表的内建样式
  listType: {
    type: String as PropType<UploadProps['listType']>,
    default: 'picture-card',
  },
  // 上传的文件大小限制，单位为MB
  fileSizeLimit: {
    type: Number,
    default: 2,
  },
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const emit = defineEmits(['update:value']); // 必须 emit `update:value`

const fileList = ref<UploadFile[]>([]);

const accept = computed(() => {
  switch (props.fileType) {
    case 'image': {
      return 'image/jpg,image/jpeg,image/png';
    }
    case 'video': {
      return 'video/mp4';
    }
    default: {
      return '';
    }
  }
});

watchOnce(
  () => props.value,
  (urls) => {
    if (Array.isArray(urls) && urls.length > 0) {
      fileList.value = urls.map((url) => ({
        uid: url,
        name: url,
        url: import.meta.env.VITE_OSS_URL + url,
        status: 'done',
        thumbUrl: import.meta.env.VITE_OSS_URL + url,
      }));
    }
  },
);

const handleChange: UploadProps['onChange'] = ({ fileList: newList }) => {
  fileList.value = newList;
  emit('update:value', unref(newList));
};

const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
  const isLt2M = file.size / 1024 / 1024 < props.fileSizeLimit;
  if (!isLt2M) {
    message.warning(`文件大小必须小于 ${props.fileSizeLimit} MB`);
    return Upload.LIST_IGNORE;
  }
  return true;
};
// 自定义上传
const customRequest = (options: RcCustomRequestOptions) => {
  const { file, onSuccess, onError, onProgress } = options;

  multipartUpload(
    file as File,
    options.filename!,
    (res) => {
      if (res && res.url) {
        onSuccess && onSuccess(res); // 通知 Upload 组件上传成功
      } else {
        onError && onError(new Error('上传失败'), res); // 通知 Upload 组件上传失败
      }
    },
    (percent) => {
      onProgress?.({ percent }); // ✅ 上传进度回调给 Upload 组件
    },
  );
};
onBeforeMount(() => {
  localGetOssSecurityToken();
});
</script>

<template>
  <div>
    <Upload
      :accept="accept"
      :file-list="fileList"
      list-type="picture-card"
      :multiple="true"
      :max-count="props.maxCount"
      :before-upload="beforeUpload"
      @change="handleChange"
      :custom-request="customRequest"
    >
      <template #default>
        <div
          class="flex flex-col items-center"
          v-if="fileList.length < props.maxCount"
        >
          <AdvPlusOutlined />
          <div class="mt-2 text-sm">上传</div>
        </div>
      </template>
    </Upload>
  </div>
</template>
