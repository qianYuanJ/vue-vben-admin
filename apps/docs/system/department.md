# 部门管理模块

## 模块概述

部门管理模块用于维护公司的组织架构，支持部门的创建、编辑、删除以及层级结构管理，同时提供员工管理入口。

## 页面结构

- **部门列表页面** - `apps/web-antd/src/views/system/dept/list.vue`
  - 提供部门数据的树形展示
  - 支持部门的创建、编辑、删除操作
  - 提供进入员工管理的入口
- **部门表单** - `apps/web-antd/src/views/system/dept/modules/form.vue`

  - 用于创建或编辑部门信息
  - 包含部门名称、上级部门等必要字段

- **员工管理** - `apps/web-antd/src/views/system/dept/employee/list.vue`
  - 展示指定部门下的员工列表
  - 支持员工的创建、编辑、删除操作

## 数据交互

### API接口

- 获取部门列表：`GET /platform_department/all`
- 创建部门：`POST /platform_department/add`
- 更新部门：`POST /platform_department/update`
- 删除部门：`POST /platform_department/delete`

### 数据模型

部门数据结构：

```typescript
interface DepartmentModel {
  id: string;
  parent_id?: string;
  name: string;
  remark?: string;
  children?: DepartmentModel[];
}
```

## 关键实现

### 树形结构处理

部门数据使用树形结构展示，需要在前端处理服务端返回的扁平数据结构：

1. 接收后端返回的部门数据列表
2. 将部门数据转换为树形结构，根据 `parent_id` 确定父子关系
3. 使用 VXE-Table 的树形表格进行展示

### 数据交互流程

1. 加载部门列表时，调用获取部门列表API
2. 创建/编辑部门时，使用表单组件收集数据，提交到对应的API
3. 删除部门时，先验证该部门下是否有子部门或员工，再进行删除操作

### 员工管理集成

1. 部门列表中提供员工管理入口，点击可跳转到对应部门的员工列表
2. 员工管理页面接收部门ID作为参数，筛选显示该部门下的员工
3. 员工创建时，默认关联当前选中的部门

## 注意事项

1. 删除部门前需检查是否有子部门和关联员工，防止误删导致数据不一致
2. 部门层级不宜过深，建议控制在3-4层以内，保持良好的可用性
3. 部门状态变更可能影响关联员工的相关业务流程，需谨慎操作
