<script lang="ts" setup>
import type { FormInstance, RadioChangeEvent } from 'ant-design-vue';

import type { SellerCompanyManage } from '@vben/types';

import { computed, onBeforeUnmount, reactive, ref, useTemplateRef } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Textarea,
  TypographyText,
  TypographyTitle,
} from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { auditPassApi, auditRejectApi } from '#/api/merchant/store_decoration';
import { emitter } from '#/emitter';

import { useModalFormSchema } from '../data';

const emit = defineEmits(['success']);

const formData = ref<SellerCompanyManage>();
const getTitle = computed(() => {
  switch (formData.value?.action) {
    case 'audit': {
      modalApi.setState({
        showConfirmButton: true,
        confirmText: '通过审核',
        cancelText: '拒绝审核',
      });
      return '审核';
    }
    case 'detail': {
      modalApi.setState({
        showConfirmButton: false,
        showCancelButton: false,
      });
      return '详情';
    }
    default: {
      modalApi.setState({
        showConfirmButton: false,
      });
      return '';
    }
  }
});

const [VbenForm, formApi] = useVbenForm({
  layout: 'vertical',
  schema: useModalFormSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

function resetForm() {
  formApi.resetForm();
  formApi.setValues(formData.value || {});
}

const [VbenModal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();

    if (valid) {
      modalApi.lock();
      const params = {
        ...formData.value,
        examine_status: '已通过',
      };

      try {
        await auditPassApi(params);
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
        openingTimeValue.value = data.order_time?.split('～')[0] ?? '';
        expirationTimeValue.value = data.order_time?.split('～')[1] ?? '';
        radioDisabled.value = data.action !== 'audit';
        showResetBtn.value = data.action === 'audit';
        radioGroupValue.value =
          data.favourableProduct?.favourable_product_name === '销售无忧版'
            ? 1
            : 2;
        formApi.setValues(formData.value);
      }
    }
  },
  async onCancel() {
    // modalApi.close();
    // emit('success');
    auditReasonModal.value = true;
  },
});

emitter.on('mapPointSelected', (data) => {
  formData.value = data;
  resetForm();
});

onBeforeUnmount(() => {
  emitter.off('mapPointSelected');
});

const radioGroupValue = ref(1);
const openingTimeValue = ref('');
const expirationTimeValue = ref('');
const radioDisabled = ref(true);
const showResetBtn = ref(false);

const onRadioChange = (e: RadioChangeEvent) => {
  formApi.setFieldValue('RadioGroup', e.target.value);
};
// 拒绝原因弹窗
const auditReasonModal = ref<boolean>(false);
// 拒绝表单
const auditReasonFormRef = useTemplateRef<FormInstance>('form');
const auditReasonFormState = reactive({
  audit_reason: '',
});
const onAuditReasonConfirm = async () => {
  const data = await auditReasonFormRef.value?.validate!();
  if (data?.audit_reason) {
    formData.value!.examine_status = '待商家修改';
    formData.value!.audit_reason = data.audit_reason;

    const params = {
      ...formData.value,
    };
    await auditRejectApi(params);
    modalApi.close();
    emit('success');
  }
};
</script>

<template>
  <VbenModal :title="getTitle" class="w-[50vw]">
    <Card v-if="formData?.examine_status === '待商家修改'">
      <TypographyTitle type="danger" :level="5"> 审核未通过 </TypographyTitle>
      <TypographyText>
        {{ formData?.audit_reason }}
      </TypographyText>
    </Card>
    <VbenForm class="mx-4">
      <template #RadioGroup>
        <RadioGroup
          v-model:value="radioGroupValue"
          :disabled="radioDisabled"
          @change="onRadioChange"
        >
          <Radio :value="1">
            <div class="flex flex-col gap-1">
              <div class="font-bold">销售无忧版</div>
              <div>
                50000/1年
                (赠送企业认证+商家会员；通过线下+线上两大渠道，与商家约定包销2000吨/年；若销售利润未达预期，则按照25元/吨价格将未达成部分予以退款或延长服务期，确保售后无忧。)
              </div>
            </div>
          </Radio>
          <div class="h-[12px]"></div>
          <Radio :value="2">
            <div class="flex flex-col gap-1">
              <div class="font-bold">开店无忧版</div>
              <div>
                29800/2年 (赠送企业认证，配备专属运营店长对接，协助
                开通运营店铺，以及制作上架10款产品、店铺
                装修、企业宣传推广等等，具体参考服务明细)
              </div>
            </div>
          </Radio>
        </RadioGroup>
      </template>
      <template #opening_time="props">
        <Input
          :disabled="props.disabled"
          :style="props.style"
          v-model:value="openingTimeValue"
        />
      </template>
      <template #expiration_time="props">
        <Input
          :disabled="props.disabled"
          :style="props.style"
          v-model:value="expirationTimeValue"
        />
      </template>
    </VbenForm>
    <template v-if="showResetBtn" #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
    <Modal v-model:open="auditReasonModal" @ok="onAuditReasonConfirm">
      <Form ref="form" layout="vertical" :model="auditReasonFormState">
        <FormItem name="audit_reason" label="拒绝原因" required>
          <Textarea v-model:value="auditReasonFormState.audit_reason" />
        </FormItem>
      </Form>
    </Modal>
  </VbenModal>
</template>
