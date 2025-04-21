# 公共组件

## 概述

本文档介绍系统中的核心公共组件，这些组件在整个应用中被广泛使用，具有高复用性和一致的交互体验。熟悉这些组件可以帮助开发人员提高开发效率，保持界面风格统一。

## 核心组件

### VbenForm - 表单组件

**路径**：`#/adapter/form`

**功能**：

- 基于JSON Schema生成表单
- 支持各种类型的表单控件
- 内置表单验证
- 提供统一的表单操作API

**使用示例**：

```typescript
const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

// 获取表单值
const values = await formApi.getValues();

// 设置表单值
formApi.setValues(data);

// 表单验证
const { valid } = await formApi.validate();
```

### VbenVxeGrid - 表格组件

**路径**：`#/adapter/vxe-table`

**功能**：

- 基于VXE-Table的高性能表格
- 支持复杂表格功能：排序、筛选、树形结构等
- 集成分页和数据加载
- 自定义单元格渲染

**使用示例**：

```typescript
const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          // 加载数据逻辑
        },
      },
    },
  },
});
```

### VbenModal - 弹窗组件

**路径**：`@vben/common-ui`

**功能**：

- 标准化的模态窗口
- 支持传递数据和回调
- 提供锁定和解锁API
- 优雅处理确认和取消逻辑

**使用示例**：

```typescript
const [Modal, modalApi] = useVbenModal({
  onConfirm() {
    // 确认逻辑
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData();
      // 初始化逻辑
    }
  },
});
```

### VbenDrawer - 抽屉组件

**路径**：`@vben/common-ui`

**功能**：

- 侧边抽屉式交互
- 适合表单编辑和详情展示
- API与Modal组件保持一致

**使用示例**：

```typescript
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    // 确认逻辑
    drawerApi.close();
  },
});
```

### VbenTree - 树形组件

**路径**：`@vben/common-ui`

**功能**：

- 树形数据展示与选择
- 支持多选和单选
- 支持自定义节点渲染
- 提供展开/折叠控制API

**使用示例**：

```typescript
<VbenTree
  :tree-data="treeData"
  multiple
  bordered
  value-field="id"
  label-field="name"
>
  <template #node="{ value }">
    // 自定义节点内容
  </template>
</VbenTree>
```

### Page - 页面容器

**路径**：`@vben/common-ui`

**功能**：

- 统一页面布局和间距
- 自动处理内容区域高度
- 支持固定头部和底部

**使用示例**：

```vue
<Page auto-content-height>
  <template #header>
    // 页面标题和操作区
  </template>
  
  // 主要内容区
  
  <template #footer>
    // 页脚区域
  </template>
</Page>
```

## 自定义渲染器

### CellOperation - 操作按钮渲染器

**路径**：`#/adapter/vxe-table`

**功能**：

- 在表格中渲染操作按钮组
- 支持权限控制
- 统一的按钮样式和间距

**使用示例**：

```typescript
{
  field: 'operation',
  title: '操作',
  width: 200,
  fixed: 'right',
  cellRender: {
    name: 'CellOperation',
    options: ['edit', 'delete', 'employee'],
    props: {
      onClick: (type, row) => {
        // 处理按钮点击
      },
    },
  },
}
```

### CellButton - 单按钮渲染器

**路径**：`#/adapter/vxe-table`

**功能**：

- 在表格中渲染单个按钮
- 支持自定义按钮文本、类型、大小等

**使用示例**：

```typescript
{
  field: 'action',
  title: '操作',
  cellRender: {
    name: 'CellButton',
    props: {
      type: 'primary',
      text: '查看',
      onClick: (row) => {
        // 处理按钮点击
      },
    },
  },
}
```

## 最佳实践

1. **组件复用**：优先使用现有公共组件，避免重复开发
2. **配置优先**：使用配置式开发，减少命令式代码
3. **数据驱动**：遵循数据驱动视图的原则，保持组件无状态
4. **抽象封装**：业务逻辑和UI展示分离，提高代码可维护性
5. **国际化支持**：所有文本使用i18n函数`$t`包装，支持多语言
