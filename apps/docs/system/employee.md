# 员工管理模块

## 模块概述

员工管理模块用于维护公司的员工信息，支持员工的创建、编辑、删除等操作。该模块与部门管理模块紧密关联，每个员工都归属于特定部门。

## 页面结构

- **员工列表页面** - `apps/web-antd/src/views/system/dept/employee/list.vue`
  - 展示部门下的员工列表数据
  - 支持员工的搜索、筛选功能
  - 提供创建、编辑、删除员工的操作入口
- **员工表单** - `apps/web-antd/src/views/system/dept/employee/form.vue`

  - 用于创建或编辑员工信息
  - 包含员工姓名、手机号码、角色、所属部门等基本信息

- **数据配置** - `apps/web-antd/src/views/system/dept/employee/data.ts`
  - 定义表单和表格的结构配置
  - 设置表单验证规则和列表展示内容

## 数据交互

### API接口

- 获取员工列表：`POST /platform_user/get_platform_user_page`
- 创建员工：`POST /platform_user/add_platform_user`
- 更新员工：`POST /platform_user/update_platform_user`
- 删除员工：`GET /platform_user/delete_platform_user?id={id}`

### 数据模型

员工数据结构：

```typescript
interface PlatformUser {
  id: string;
  nickname: string; // 员工姓名
  phone: string; // 手机号码
  department_id: string; // 部门ID
  department_name: string; // 部门名称
  job: string; // 职位
  sex: string; // 性别
  role_ids: string[]; // 角色ID数组
  created_at?: string; // 创建时间
  user_id?: string; // 关联的用户ID
}
```

## 关键实现

### 与部门关联

1. 从部门管理页面进入员工管理时，会携带部门ID作为参数
2. 员工列表页面根据部门ID自动筛选显示该部门下的员工
3. 创建新员工时，默认设置所属部门为当前选中的部门

### 列表数据加载

员工列表使用分页加载：

```typescript
async function loadEmployeeData() {
  const params: RequestListParams = {
    page: currentPage.value,
    size: pageSize.value,
    param: [],
    // 根据部门ID筛选
    ...(departmentId.value
      ? {
          param: [{ field: 'department_id', value: departmentId.value }],
        }
      : {}),
  };

  const res = await getEmployeeList(params);
  employeeList.value = res.results;
  total.value = res.count;
}
```

### 表单验证

员工表单中包含以下验证规则：

- 员工姓名：必填项，2-30个字符
- 手机号：必填项，符合手机号格式规则
- 职位：必填项
- 所属部门：必填项，从部门树中选择

## 注意事项

1. 员工信息中的手机号应注意隐私保护，在展示时可考虑部分脱敏
2. 删除员工前需确认没有关联的重要业务数据
3. 员工状态变更可能影响其登录和使用系统的权限，需谨慎操作
4. 批量导入员工数据时，需注意数据格式的正确性和完整性
