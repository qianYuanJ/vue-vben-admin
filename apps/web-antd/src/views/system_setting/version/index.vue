<script lang="ts" setup>
import type { RequestListParams, ResponseList } from '@vben/types';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { AppVersionModel } from '#/api/system/app-version';

import { ref, toRaw } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { requestClient } from '#/api/request';
import { deleteAppVersion } from '#/api/system/app-version';

import { requestParamsHandler, useColumns, useGridFormSchema } from './data';
import ModalForm from './modules/modalForm.vue';

// 定义APP类型
interface AppConfig {
  key: string;
  name: string;
  editionType: string;
  // 是否为物流系统应用
  isLogistics?: boolean;
}

// 可用的APP列表
const appList = ref<AppConfig[]>([
  { key: 'mms', name: '煤贸商城', editionType: '__UNI__B128014' },
  { key: 'collect', name: '煤贸信息采集', editionType: '__UNI__F73D3E4' },
  { key: 'business', name: '煤贸商家', editionType: '__UNI__6C01461' },
  { key: 'group', name: '煤贸集团', editionType: '__UNI__ED4038E' },
  {
    key: 'logistics_store',
    name: '物流门店',
    editionType: '__UNI__67B1B7B',
    isLogistics: true,
  },
  {
    key: 'logistics_driver',
    name: '物流司机',
    editionType: '__UNI__D3BA5FE',
    isLogistics: true,
  },
]);

// API端点
const API_ENDPOINTS = {
  default: '/edition/get_page_edition',
  logistics:
    'http://api.rmb.test.rongmeibao.com:8111/logistics_portal/edition/get_page_edition',
};

// 存储列表数据
const listData = ref<AppVersionModel[]>([]);

// 表格数据加载函数
const loadTableData = async (
  { page }: { page: { currentPage: number; pageSize: number } },
  formValues: Record<string, any>,
) => {
  const params: RequestListParams = {
    page: page.currentPage,
    size: page.pageSize,
    param: [],
    sort: [
      {
        field: 'create_time',
        order: 'DESC',
      },
    ],
  };

  // 使用参数处理器处理筛选条件
  const apiParams = requestParamsHandler({
    formValues,
    params,
    appList: appList.value,
  });

  try {
    // 确定当前应用是否为物流系统应用
    const selectedApp = appList.value.find(
      (app) => app.key === formValues.app_type,
    );
    const isLogisticsApp = selectedApp?.isLogistics || false;

    // 选择对应的API端点
    const apiEndpoint = isLogisticsApp
      ? API_ENDPOINTS.logistics
      : API_ENDPOINTS.default;

    // 发送请求
    const res = await requestClient.post<ResponseList<AppVersionModel[]>>(
      apiEndpoint,
      apiParams,
    );

    // 处理返回数据，将包类型的数字值转换为字符串，确保在UI中正确显示
    const items = res.results.map((item: any) => {
      return {
        ...item,
        package_type: String(item.package_type), // 确保package_type是字符串
      };
    });

    // 保存列表数据，以便创建时使用
    listData.value = items;

    return {
      items,
      total: res.count,
    };
  } catch (error) {
    console.error('加载APP版本数据失败', error);
    return {
      items: [],
      total: 0,
    };
  }
};

// 初始化表单模态框
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: ModalForm,
  destroyOnClose: true,
});

// 初始化表格
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(appList.value),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    rowConfig: {
      keyField: 'id',
    },
    proxyConfig: {
      ajax: {
        query: loadTableData,
      },
      autoLoad: true,
    },
    toolbarConfig: {
      custom: true,
      refresh: { code: 'query' },
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<AppVersionModel>,
});

// 打开下载链接
function openDownloadLink(url: string) {
  window.open(url, '_blank');
}

// 创建新版本
function handleCreate() {
  // 如果列表中有数据，使用第一条作为默认值
  if (listData.value.length > 0) {
    const defaultItem = listData.value[0];
    formModalApi.setData({ ...toRaw(defaultItem), id: '' }).open();
  } else {
    // 如果列表中没有数据，使用空对象
    formModalApi.setData({}).open();
  }
}

// 编辑版本
function handleEdit(row: AppVersionModel) {
  formModalApi.setData(row).open();
}

// 删除版本
async function handleDelete(row: AppVersionModel) {
  try {
    // 查找应用类型
    const foundApp = appList.value.find(
      (app) => app.editionType === row.edition_type,
    );
    const isLogistics = foundApp?.isLogistics || false;

    // 发送删除请求
    await deleteAppVersion(row.id!, isLogistics);

    // 刷新表格数据
    gridApi.query();
  } catch (error) {
    console.error('删除失败', error);
  }
}

// 表单成功提交后刷新表格
function onModalFormSuccess() {
  gridApi.query();
}
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="onModalFormSuccess" />
    <Grid table-title="APP版本管理">
      <template #toolbar-tools>
        <Button type="primary" @click="handleCreate">
          <Plus class="size-5" />
          新建版本
        </Button>
      </template>
      <template #operation="{ row }">
        <div class="operation-btns">
          <Button
            type="link"
            size="small"
            @click="openDownloadLink(row.edition_url)"
          >
            下载
          </Button>
          <Button type="link" size="small" @click="handleEdit(row)">
            编辑
          </Button>
          <Popconfirm title="确定要删除此版本吗?" @confirm="handleDelete(row)">
            <Button type="link" size="small" danger> 删除 </Button>
          </Popconfirm>
        </div>
      </template>
    </Grid>
  </Page>
</template>

<style scoped>
:deep(.vben-vxe-form) {
  margin-top: 16px;
}

:deep(.vben-vxe-table) {
  height: auto;
  overflow: hidden;
}

:deep(.vben-vxe-form .ant-form-item) {
  margin-right: 12px;
  margin-bottom: 16px;
}

:deep(.vben-vxe-form .ant-form-item-control-input) {
  min-height: auto;
}

.operation-btns {
  display: flex;
  justify-content: space-around;
}

:deep(.operation-btns .ant-btn) {
  padding: 0 8px;
}
</style>
