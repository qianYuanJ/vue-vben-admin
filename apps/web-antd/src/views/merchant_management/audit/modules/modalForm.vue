<script lang="ts" setup>
import type { RadioChangeEvent } from 'ant-design-vue';

import type { ImBuyerBusinessSettled } from '@vben/types';

import { computed, onBeforeUnmount, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, Input, Radio, RadioGroup } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { auditPassApi } from '#/api/merchant/audit';
import { emitter } from '#/emitter';

import { useModalFormSchema } from '../data';

const emit = defineEmits(['success']);

const formData = ref<ImBuyerBusinessSettled>();
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
/**
 * address
: 
"哈哈哈哈"
audit_reason
: 
""
bank_card_no
: 
null
bank_deposit_name
: 
null
business_license_name
: 
null
business_license_photo
: 
null
city
: 
"北京市"
city_code
: 
"110100"
company_union_id
: 
null
contacts
: 
"用户1234"
contacts_phone
: 
"15912341234"
country
: 
null
country_code
: 
null
create_time
: 
"2024-06-11 15:02:02"
discount_price
: 
0
district
: 
null
district_code
: 
null
examine_result
: 
""
examine_status
: 
"已通过"
expire_time
: 
""
favourableProduct
: 
{id: "291654b548d74aa5ad17fbb3148cdd29", favourable_product_name: "销售无忧版",…}
favourableProductFormatter
: 
""
id
: 
"7f44ad96e6ab41d0b7fb1332af049e55"
id_card_photo_a
: 
"ocr_card/202406/1718089198162_wx_camera_1713237806791.jpg"
id_card_photo_b
: 
"ocr_card/202406/1718089209277_wx_camera_1713237879129.jpg"
information_fee
: 
null
latitude
: 
null
legal_person
: 
"金阳"
legal_person_id_card
: 
"110102198010272321"
longitude
: 
null
main_business
: 
"主营个人业务"
name
: 
"222222"
operator_name
: 
"张玺柏"
operator_user_id
: 
"fcdb9e3dfbc44d3dac07569616c74999"
order_time
: 
null
owner_id
: 
"110cddefbb804a8992a2c6f48dbccbf6"
pay_status
: 
"待支付"
payee_name
: 
null
payment_amount
: 
50000
payment_amount_all
: 
50000
payment_bank_card_no
: 
"1222 0078 8010 00000400"
payment_bank_deposit_name
: 
"浦发银行鄂尔多斯康巴什支行"
payment_time
: 
null
product_configuration_service_id
: 
"291654b548d74aa5ad17fbb3148cdd29"
province
: 
"北京市"
province_code
: 
"110000"
qr_code_payment_information
: 
"https://rt-rongmeibao.oss-cn-beijing.aliyuncs.com/trade-platform-web/20240513/954c9175761e7e628df94d778d3cbcc1.png"
refuse_reason
: 
""
region_id
: 
null
region_name
: 
null
self_business
: 
false
self_support
: 
"个人"
seller_qr_code
: 
"https://rt-rongmeibao.oss-cn-beijing.aliyuncs.com/trade-platform-web/20240514/ad0ec4aa425e8c92dd578481fa56ba4d.png"
service_fee
: 
null
settled_way
: 
null
ship_address
: 
"北京市北京市东城区"
title1
: 
""
type
: 
1
updated_time
: 
"2024-06-11 15:02:14"
 */
const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();

    if (valid) {
      modalApi.lock();
      const data = await formApi.getValues();
      const params = {
        ...data,
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
      const data = modalApi.getData<ImBuyerBusinessSettled>();
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
</script>

<template>
  <Modal :title="getTitle" class="w-[50vw]">
    <Form class="mx-4">
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
    </Form>
    <template v-if="showResetBtn" #prepend-footer>
      <div class="flex-auto">
        <Button type="primary" danger @click="resetForm"> 重置 </Button>
      </div>
    </template>
  </Modal>
</template>
