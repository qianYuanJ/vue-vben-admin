<script setup lang="ts">
import type { UploadFile, UploadProps } from 'ant-design-vue';
import type { UploadRequestOption as RcCustomRequestOptions } from 'ant-design-vue/es/vc-upload/interface';

import type { PropType } from 'vue';

import { computed, onBeforeMount, ref, unref } from 'vue';

import { AdvPlusOutlined } from '@vben/icons';

import { message, Modal, Upload } from 'ant-design-vue';

import { emitter } from '#/emitter';
import { localGetOssSecurityToken, multipartUpload } from '#/utils/upload';
// import { getOssTokenApi } from '#/api/oss';

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
const emit = defineEmits(['update:value']);
emitter.on('get:upload', (urls) => {
  if (urls === '') return;
  const temp = urls.split(',');
  if (temp.length > 0 && props.fileType === 'image') {
    imageUrls.value.push(...temp);
    fileList.value = temp.map((url) => ({
      uid: url,
      name: url.split('/').pop()!,
      status: 'done',
      url: import.meta.env.VITE_OSS_URL + url,
    }));
  }
});

const fileList = ref<UploadFile[]>([]);

const previewVisible = ref(false);
const previewUrl = ref('');
const previewTitle = ref('');
const imageUrls = ref<string[]>([]);
// 接受的文件类型
const accept = computed(() => {
  return props.fileType === 'image' ? 'image/jpeg,image/png' : 'video/mp4';
});

onBeforeMount(() => {
  localGetOssSecurityToken();
});

// 读取文件为 base64
function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.addEventListener('error', (error) => reject(error));
  });
}

// 预览弹窗
const handlePreview: UploadProps['onPreview'] = async (file) => {
  if (!file.url && !file.preview && file.originFileObj) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewUrl.value = file.url || (file.preview as string);
  previewVisible.value = true;
  previewTitle.value =
    file.name ||
    file.url?.slice(Math.max(0, file.url.lastIndexOf('/') + 1)) ||
    '';
};

// 上传文件变更
const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  fileList.value = newFileList;
  imageUrls.value = [];
  newFileList.forEach((item) => {
    if (item.status === 'done' && !!item.response) {
      imageUrls.value.push((item.response as { url: string }).url);
    } else {
      imageUrls.value.push(item.uid);
    }
  });
  // 通知父组件上传成功，并传递图片地址数组
  emitter.emit('update:upload', unref(imageUrls));
  emit('update:value', unref(imageUrls));
};

// 关闭预览
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

// 上传前校验（比如限制大小）
const beforeUpload = async (file: File) => {
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
</script>

<template>
  <div>
    <Upload
      :accept="accept"
      v-model:file-list="fileList"
      :list-type="props.listType"
      :on-preview="handlePreview"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      :max-count="props.maxCount"
      multiple
    >
      <template #default>
        <div
          class="flex flex-col items-center"
          v-if="fileList.length < props.maxCount"
        >
          <AdvPlusOutlined />
          <div class="mt-2 text-sm">
            上传{{ props.fileType === 'image' ? '图片' : '视频' }}
          </div>
        </div>
      </template>
    </Upload>

    <Modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        v-if="props.fileType === 'image'"
        alt="预览"
        style="width: 100%"
        :src="previewUrl"
      />
      <video
        v-if="props.fileType === 'video'"
        :src="previewUrl"
        class="video mb-1 mr-1"
        poster=""
        controls
      >
        您的浏览器不支持 video 标签。
      </video>
    </Modal>
  </div>
</template>
