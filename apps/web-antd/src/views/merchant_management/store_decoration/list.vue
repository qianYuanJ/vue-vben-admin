<script setup lang="ts">
import type { RequestListParams, SellerCompanyManage } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { colors } from '@vben/colors';
import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getStoreDecorationList } from '#/api/merchant/store_decoration';

import { requestParamsHandler, useColumns, useGridFormSchema } from './data';

const [Grid] = useVbenVxeGrid({
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
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="商家入驻审核">
      <template #operation="{ row }">
        <Button
          type="link"
          v-if="row.examine_status === '已通过'"
          :style="{ color: colors.success }"
        >
          详情
        </Button>
        <Button type="link" v-else :style="{ color: colors.primary }">
          审核
        </Button>
        <Button type="link" :style="{ color: colors.warning }">
          设置标签
        </Button>
      </template>
    </Grid>
  </Page>
</template>

<style></style>
