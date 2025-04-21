<script lang="ts" setup>
import type { OperateLog, RequestListParams } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api/system/role1';

import { ref, toRaw } from 'vue';

import { JsonViewer, Page } from '@vben/common-ui';

import { Button, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getOperationLogList } from '#/api/system/operation-log';

import { requestParamsHandler, useColumns, useGridFormSchema } from './data';

const open = ref<boolean>(false);
const currentRow = ref<OperateLog>({});
const requestJson = ref({});

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
  requestJson.value = {
    接口地址: currentRow.value.request_url,
    接口请求类型: currentRow.value.request_method,
    请求报文: JSON.parse(currentRow.value.parameter ?? '{}'),
    响应报文: JSON.parse(currentRow.value.return_value ?? '{}'),
  };
  open.value = true;
};
</script>
<template>
  <Page auto-content-height>
    <Grid table-title="日志列表">
      <template #operation="{ row }">
        <Button type="link" @click="onCheckClick(row)">查看</Button>
      </template>
    </Grid>
    <Modal v-model:open="open" :footer="null" width="80vw" :closable="false">
      <JsonViewer
        :value="requestJson"
        :expand-depth="1"
        copyable
        :sort="false"
        boxed
      />
    </Modal>
  </Page>
</template>
