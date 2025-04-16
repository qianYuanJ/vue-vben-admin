<script lang="ts" setup>
import type { OperateLog, RequestListParams } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api/system/role1';

import { ref, toRaw } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getOperationLogList } from '#/api/system/operation-log';
import { $t } from '#/locales';

import { requestParamsHandler, useColumns, useGridFormSchema } from './data';

const open = ref<boolean>(false);
const currentRow = ref<OperateLog>({});

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
            param: [],
            size: page.pageSize,
            sort: [{ field: 'create_time', order: 'DESC' }],
          };
          const apiParams = requestParamsHandler({ formValues, params });
          const res = await getOperationLogList(apiParams);

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
  } as VxeTableGridOptions<SystemRoleApi.SystemRole>,
});

const onCheckClick = (row: OperateLog) => {
  currentRow.value = toRaw(row);
  open.value = true;
};
</script>
<template>
  <Page auto-content-height>
    <Grid :table-title="$t('system.operationLog.list')">
      <template #operation="{ row }">
        <Button type="link" @click="onCheckClick(row)">查看</Button>
      </template>
    </Grid>
    <Modal v-model:open="open" :footer="null" width="80vw">
      <div class="flex flex-col gap-1 bg-[#FBFBFB] p-2 text-[#CCCCCC]">
        <div>接口地址：{{ currentRow.request_url || '无' }}</div>
        <div>接口请求类型：{{ currentRow.request_method }}</div>
        <div>请求报文：{{ currentRow.parameter }}</div>
      </div>
      <div class="flex flex-col gap-1 bg-[#FBFBFB] p-2 text-[#CCCCCC]">
        <div>响应报文：{{ currentRow.return_value }}</div>
      </div>
    </Modal>
  </Page>
</template>
