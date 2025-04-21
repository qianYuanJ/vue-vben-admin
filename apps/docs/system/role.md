# 角色权限管理模块

## 模块概述

角色权限管理模块是系统权限管控的核心，用于创建和管理系统中的角色，并为每个角色分配对应的菜单和功能权限。通过该模块，可以灵活地控制不同用户对系统功能的访问权限。

## 页面结构

- **角色列表页面** - `apps/web-antd/src/views/system/role/index.vue`
  - 展示系统中的所有角色列表
  - 支持角色的搜索、筛选功能
  - 提供创建、编辑、删除角色的操作入口
- **角色表单** - `apps/web-antd/src/views/system/role/modules/form.vue`

  - 用于创建或编辑角色信息
  - 包含角色名称、描述等基本信息
  - 集成权限树，用于分配角色对应的功能权限

- **数据配置** - `apps/web-antd/src/views/system/role/data.ts`
  - 定义表单和表格的结构配置
  - 设置表单验证规则和列表展示内容

## 数据交互

### API接口

- 获取角色列表：`GET /api/system/role/list`
- 创建角色：`POST /api/system/role/create`
- 更新角色：`PUT /api/system/role/{id}`
- 删除角色：`DELETE /api/system/role/{id}`
- 获取角色详情：`GET /api/system/role/{id}`
- 获取系统菜单：`GET /api/system/menu/list`

### 数据模型

角色数据结构：

```typescript
interface RoleModel {
  id: string | number;
  name: string;
  description: string;
  status: number;
  created_time: string;
  menu_ids: string[] | number[];
}
```

菜单数据结构：

```typescript
interface MenuModel {
  id: string | number;
  name: string;
  path: string;
  component: string;
  redirect: string;
  meta: {
    title: string;
    icon: string;
    [key: string]: any;
  };
  children?: MenuModel[];
}
```

## 关键实现

### 权限树处理

1. 从后端获取完整的菜单树结构
2. 转换为前端树组件所需的数据格式
3. 根据角色已有权限，在权限树中设置选中状态
4. 支持多选，允许一次性选择多个菜单权限

### 权限分配流程

1. 编辑角色时，加载该角色已分配的权限
2. 通过树形组件展示系统所有菜单，并自动选中已分配的权限
3. 修改权限选择后，提交保存，后端更新角色的权限配置

## 注意事项

1. 系统应预设几个基础角色，如超级管理员、普通用户等，并限制对超级管理员角色的修改
2. 权限调整后，需要考虑已登录用户的权限刷新机制
3. 删除角色前，需确认该角色下没有关联用户，避免用户无法正常使用系统
4. 添加新的系统功能时，需要同步更新菜单权限树，确保权限管理的完整性
5. 权限控制应同时在前端和后端实现，前端主要控制UI展示，后端则负责接口访问权限控制
