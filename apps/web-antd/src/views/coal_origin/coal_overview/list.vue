<script lang="ts" setup>
import type { PlatformCoalLocality } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getCoalOverview } from '#/api/coal_origin';

import { useColumns, useGridFormSchema } from './data';
import ModalForm from './modules/modalForm.vue';

const router = useRouter();

const type = ref<string>('原煤');

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
    rowConfig: {
      keyField: 'id',
    },
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async (_, formValues) => {
          type.value = formValues.type;
          const mine_factory_id = router.currentRoute.value.query.id as string;
          const params = {
            mine_factory_id,
            type: formValues.type,
          };
          const res = await getCoalOverview(params);

          return res.data;
        },
      },
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

const onCreate = () => {
  formModalApi
    .setData({
      mine_factory_id: router.currentRoute.value.query.id as string,
      type: type.value,
    })
    .open();
};
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="gridApi.query()" />
    <Grid table-title="煤质综述">
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          新增
        </Button>
      </template>
    </Grid>
  </Page>
</template>
