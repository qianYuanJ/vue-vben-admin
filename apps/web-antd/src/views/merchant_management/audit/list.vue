<script lang="ts" setup>
import type { ImBuyerBusinessSettled, RequestListParams } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { colors } from '@vben/colors';
import { Page, useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Button, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { cancelOrderApi, getAuditList } from '#/api/merchant/audit';

import { requestParamsHandler, useColumns, useGridFormSchema } from './data';
import ModalForm from './modules/modalForm.vue';
import PayConfirmModalForm from './modules/paymentConfirmationModalForm.vue';

const userStore = useUserStore();
// 审核表单弹窗
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: ModalForm,
  destroyOnClose: true,
});
// 收款确认表单弹窗
const [PayConfirmFormModal, payConfirmFormModalApi] = useVbenModal({
  connectedComponent: PayConfirmModalForm,
  destroyOnClose: true,
});
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          const params: RequestListParams = {
            page: page.currentPage,
            param: [],
            size: page.pageSize,
            sort: [{ field: 'create_time', order: 'DESC' }],
          };
          const apiParams = requestParamsHandler({ formValues, params });
          const res = await getAuditList(apiParams);

          return {
            items: res.results,
            total: res.count,
          };
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },

    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<ImBuyerBusinessSettled>,
});
const onAction = async (row: ImBuyerBusinessSettled, key: string) => {
  // 获取矿区数据，并设置默认值
  formModalApi
    .setData({
      ...row,
      picture_urls: row.picture_urls === '' ? [] : row.picture_urls?.split(','),
      video_url: row.video_url === '' ? [] : row.video_url?.split(','),
      action: key,
    })
    .open();
};

// 取消订单操作
const handleCancel = async (row: ImBuyerBusinessSettled) => {
  try {
    // 查找应用类型
    const params = {
      id: row.id,
      pay_status: '已取消',
      operator_user_id: userStore?.userInfo?.id ?? '',
      operator_name: userStore?.userInfo?.nickname ?? '',
    };
    await cancelOrderApi(params);

    // 刷新表格数据
    gridApi.query();
  } catch (error) {
    console.error('删除失败', error);
  }
};

const onPayConfirm = (row: ImBuyerBusinessSettled) => {
  payConfirmFormModalApi
    .setData({
      ...row,
    })
    .open();
};
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="gridApi.query()" />
    <PayConfirmFormModal @success="gridApi.query()" />
    <Grid table-title="商家入驻审核">
      <template #operation="{ row }">
        <Button
          v-if="row.examine_status === '已通过' || row.pay_status === '已取消'"
          type="link"
          @click="onAction(row, 'detail')"
          :style="{ color: colors.info }"
        >
          详情
        </Button>
        <Button
          v-if="
            (row.examine_status === '待审核' ||
              row.examine_status === '待商家修改') &&
            row.pay_status !== '已取消'
          "
          type="link"
          @click="onAction(row, 'audit')"
          :style="{ color: colors.success }"
        >
          审核
        </Button>
        <Popconfirm
          v-if="row.pay_status === '待支付'"
          title="请确认是否取消该订单，取消之后不可恢复!"
          @confirm="handleCancel(row)"
        >
          <Button type="link" :style="{ color: colors.warning }"> 取消 </Button>
        </Popconfirm>
        <Button
          v-if="row.pay_status === '待支付' && row.examine_status === '已通过'"
          type="link"
          :style="{ color: colors.primary }"
          @click="onPayConfirm(row)"
        >
          收款确认
        </Button>
      </template>
    </Grid>
  </Page>
</template>
