<script lang="ts" setup>
import { computed } from 'vue';

import { AuthPageLayout } from '@vben/layouts';
import { preferences } from '@vben/preferences';

const appName = computed(() => preferences.app.name);
const logo = computed(() => preferences.logo.source);
</script>

<template>
  <AuthPageLayout
    :app-name="appName"
    :logo="logo"
    page-description="工程化、高性能、跨组件库的前端模板"
    page-title="开箱即用的大型中后台管理系统"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
