<script setup lang="ts">
import type { RequestListParams, SellerCompanyManage } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { colors } from '@vben/colors';
import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStoreDecorationList } from '#/api/merchant/store_decoration';

import { requestParamsHandler, useColumns, useGridFormSchema } from './data';
import ModalForm from './modules/modalForm.vue';
import useSetTagModalForm from './modules/useSetTagModalForm.vue';
// 审核表单弹窗
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: ModalForm,
  destroyOnClose: true,
});
// 设置标签表单弹窗
const [SetTagFormModal, setTagFormModalApi] = useVbenModal({
  connectedComponent: useSetTagModalForm,
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
            param: [
              {
                field: 'del',
                value: 0,
              },
            ],
            size: page.pageSize,
            sort: [
              {
                field: 'create_time',
                order: 'DESC',
              },
            ],
          };
          const apiParams = requestParamsHandler({ formValues, params });
          const res = await getStoreDecorationList(apiParams);

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
  } as VxeTableGridOptions<SellerCompanyManage>,
});

const onAction = async (row: SellerCompanyManage, key: string) => {
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

const onSetTagClick = (row: SellerCompanyManage) => {
  setTagFormModalApi
    .setData({
      ...row,
      seller_label: row.seller_label ? row.seller_label.split(',') : null,
    })
    .open();
};
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="gridApi.query()" />
    <SetTagFormModal @success="gridApi.query()" />
    <Grid table-title="商家入驻审核">
      <template #operation="{ row }">
        <Button
          type="link"
          v-if="row.examine_status === '已通过'"
          :style="{ color: colors.success }"
          @click="onAction(row, 'detail')"
        >
          详情
        </Button>
        <Button
          type="link"
          v-else
          :style="{ color: colors.primary }"
          @click="onAction(row, 'audit')"
        >
          审核
        </Button>
        <Button
          type="link"
          :style="{ color: colors.warning }"
          @click="onSetTagClick(row)"
        >
          设置标签
        </Button>
      </template>
    </Grid>
  </Page>
</template>
