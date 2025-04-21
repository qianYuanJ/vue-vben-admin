# APP版本管理模块

## 模块概述

APP版本管理模块用于管理移动应用的版本更新，支持创建、发布和管理不同平台(iOS/Android)的应用版本。该模块可以控制应用的强制更新策略，管理版本号、更新内容，并提供应用安装包下载链接。

## 页面结构

- **版本列表页面** - `apps/web-antd/src/views/system/app-version/index.vue`
  - 展示已创建的应用版本记录
  - 支持按平台、版本号等条件筛选
  - 提供创建、编辑、删除版本的操作入口
- **版本表单** - `apps/web-antd/src/views/system/app-version/modules/form.vue`

  - 用于创建或编辑应用版本信息
  - 包含版本号、平台类型、更新内容、下载链接等信息
  - 支持设置是否强制更新

- **数据配置** - `apps/web-antd/src/views/system/app-version/data.ts`
  - 定义表单和表格的结构配置
  - 设置表单验证规则和列表展示内容

## 数据交互

### API接口

- 获取版本列表：`GET /api/system/app-version/list`
- 创建版本：`POST /api/system/app-version/create`
- 更新版本：`PUT /api/system/app-version/{id}`
- 删除版本：`DELETE /api/system/app-version/{id}`
- 发布版本：`POST /api/system/app-version/publish/{id}`

### 数据模型

APP版本数据结构：

```typescript
interface AppVersionModel {
  id: string | number;
  app_type: 'ios' | 'android';
  version_code: number;
  version_name: string;
  force_update: boolean;
  download_url: string;
  update_content: string;
  status: number; // 0:未发布 1:已发布
  created_time: string;
  published_time?: string;
}
```

## 关键实现

### 版本管理流程

1. 创建新版本：填写基本信息、上传安装包(或填写下载链接)、编写更新内容
2. 审核版本信息：确认版本号、更新内容等信息无误
3. 发布版本：将版本状态修改为已发布，客户端可以检测到新版本

### 强制更新机制

1. 在创建版本时，可以设置该版本是否需要强制更新
2. 若设置为强制更新，则低于该版本的APP在检测到更新时，必须更新才能继续使用
3. 非强制更新版本，用户可以选择稍后更新

### 客户端检测更新

APP端通常会在以下场景检测更新：

1. APP启动时
2. 用户手动检查更新
3. 定期检查（如每天一次）

## 注意事项

1. 版本号管理应遵循语义化版本规范，确保版本号的连续性和可比较性
2. 强制更新功能应谨慎使用，避免频繁强制用户更新
3. 更新内容应清晰描述新版本的变化，便于用户了解
4. 应保留历史版本记录，以便于问题追溯
5. 对于不同平台(iOS/Android)的版本应分开管理，因为它们的发布流程和约束不同
6. 下载链接应确保稳定可靠，建议使用CDN加速
