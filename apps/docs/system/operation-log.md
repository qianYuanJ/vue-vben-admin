# 操作日志模块

## 模块概述

操作日志模块用于记录和查询系统中用户的操作行为，是系统审计和安全追溯的重要组成部分。该模块记录了用户在系统中执行的关键操作，包括操作类型、操作内容、操作结果等信息，便于管理员追踪系统使用情况和排查问题。

## 页面结构

- **操作日志列表页面** - `apps/web-antd/src/views/system/operation-log/list.vue`
  - 展示系统中的操作日志记录
  - 支持多条件筛选，如操作时间、操作人、操作类型等
  - 提供日志详情查看功能
- **日志详情查看** - 通过弹窗展示完整的日志信息

  - 包含请求参数、响应数据等详细信息
  - 支持JSON数据的格式化展示

- **数据配置** - `apps/web-antd/src/views/system/operation-log/data.ts`
  - 定义表格列配置和搜索表单配置
  - 设置日志数据的展示格式和筛选条件

## 数据交互

### API接口

- 获取操作日志列表：`POST /platform_user/get_operate_log_page`

### 数据模型

操作日志数据结构：

```typescript
interface OperateLog {
  id: string;
  user_id?: string;
  username?: string;
  operation?: string;
  request_method?: string;
  request_url?: string;
  request_ip?: string;
  parameter?: string; // JSON字符串格式的请求参数
  return_value?: string; // JSON字符串格式的响应结果
  status?: number;
  cost_time?: number; // 请求耗时(毫秒)
  created_time?: string;
}
```

## 关键实现

### 日志记录机制

操作日志的记录主要依靠后端实现，通常采用以下方式：

1. 通过AOP（面向切面编程）拦截系统中需要记录日志的接口调用
2. 记录请求参数、操作用户、请求时间等信息
3. 记录接口响应结果和执行耗时
4. 将日志信息保存到数据库中

### 前端展示与查询

前端操作日志模块主要功能是查询和展示：

1. 提供多条件组合查询，支持按时间范围、操作人、操作类型等筛选
2. 使用表格组件展示日志列表，支持分页
3. 对于详细参数和返回值，使用JSON格式化组件展示，提高可读性
4. 使用模态窗口展示日志详情，包括请求报文和响应报文

```typescript
// 日志详情查看示例
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
```

## 注意事项

1. 操作日志中可能包含敏感信息，应做好权限控制，仅允许管理员查看
2. 对于包含敏感信息的请求参数（如密码），应在记录前进行脱敏处理
3. 日志数据量可能较大，应考虑分表存储和定期归档，避免影响系统性能
4. 前端查询时应注意性能问题，避免一次加载过多数据
5. 建议设置日志保留期限，对过期日志进行归档或清理，以节省存储空间
