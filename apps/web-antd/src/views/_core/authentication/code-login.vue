<script lang="ts" setup>
import type { ExtendedFormApi, VbenFormSchema } from '@vben/common-ui';

import { computed, onMounted, ref } from 'vue';

import { AuthenticationCodeLogin, z } from '@vben/common-ui';

import { getVerifyCodeApi } from '#/api';
import { useLoginStore } from '#/store';

defineOptions({ name: 'CodeLogin' });

const loginStore = useLoginStore();

const loading = ref(false);
const CODE_LENGTH = 4;

// 新增一个变量来存储表单数据
const authFormRef = ref<InstanceType<typeof AuthenticationCodeLogin> | null>(
  null,
);

let formApi: ExtendedFormApi;
onMounted(() => {
  if (authFormRef.value) {
    formApi = authFormRef.value.getFormApi();
  }
});
const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '手机号码',
      },
      fieldName: 'phone',
      label: '手机号码',
      rules: z
        .string()
        .min(1, { message: '请输入手机号' })
        .refine((v) => /^1[3-9]\d{9}$/.test(v), {
          message: '手机号码格式错误',
        }),
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        codeLength: CODE_LENGTH,
        createText: (countdown: number) => {
          const text =
            countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码';
          return text;
        },
        /** 处理发送验证码 */
        handleSendCode: async () => {
          // 验证字段 获取验证结果对象
          const result = await formApi.validateField('phone');
          // 验证通过发送验证码
          if (result.valid) {
            const { phone } = await formApi.getValues();
            await getVerifyCodeApi({ mobile: phone });
          } else {
            throw result;
          }
        },
        placeholder: '验证码',
      },
      fieldName: 'code',
      label: '验证码',
      rules: z.string().length(CODE_LENGTH, {
        message: `请输入${CODE_LENGTH}位验证码`,
      }),
    },
  ];
});
</script>

<template>
  <AuthenticationCodeLogin
    ref="authFormRef"
    :form-schema="formSchema"
    :loading="loading"
    @submit="loginStore.login"
  />
</template>
