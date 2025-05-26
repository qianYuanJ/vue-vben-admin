<script lang="ts" setup>
import type { PlatformCoalLocality, RequestListParams } from '@vben/types';

import type { CascaderOption } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getCoalOriginList } from '#/api';
import { getTradeDictionaryData } from '#/api/dictionary';
import { emitter } from '#/emitter';

import {
  findCascaderPathByKey,
  handleMultipleSelected,
  requestParamsHandler,
  useColumns,
  useGridFormSchema,
} from './data';
import ModalForm from './modules/modalForm.vue';

const router = useRouter();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: ModalForm,
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
          const res = await getCoalOriginList(apiParams);

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
  } as VxeTableGridOptions<PlatformCoalLocality>,
});
const onEdit = async (row: PlatformCoalLocality) => {
  // 获取矿区数据，并设置默认值
  const miningAreaOptions = await getTradeDictionaryData('kq')();
  const defaultMiningArea = findCascaderPathByKey(
    miningAreaOptions as CascaderOption[],
    'value',
    row.mining_area,
  );

  formModalApi
    .setData({
      ...row,
      mining_area: defaultMiningArea,
      calorific_range: handleMultipleSelected(row.calorific_range ?? ''),
      main_operate: handleMultipleSelected(row.main_operate ?? ''),
      picture_urls: row.picture_urls === '' ? [] : row.picture_urls?.split(','),
      video_url: row.video_url === '' ? [] : row.video_url?.split(','),
    })
    .open();
  nextTick(() => {
    emitter.emit('update:coalOrigin', row);
    emitter.emit('get:coalOrigin', row);
  });
};

const toCoalOverview = (row: PlatformCoalLocality) => {
  router.push({
    path: '/coal_origin/coal_overview',
    query: {
      id: row.mine_factory_id,
    },
  });
};
</script>
<template>
  <Page auto-content-height>
    <FormModal @success="gridApi.query()" />
    <Grid table-title="原煤产地">
      <template #operation="{ row }">
        <Button type="link" @click="onEdit(row)">编辑</Button>
        <Button type="link" @click="toCoalOverview(row)">煤质综述</Button>
      </template>
    </Grid>
  </Page>
</template>
