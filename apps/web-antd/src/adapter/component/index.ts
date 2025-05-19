/**
 * 通用组件共同的使用的基础组件，原先放在 adapter/form 内部，限制了使用范围，这里提取出来，方便其他地方使用
 * 可用于 vben-form、vben-modal、vben-drawer 等组件使用,
 */

import type { Component } from 'vue';

import type { BaseFormComponentType } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { defineComponent, getCurrentInstance, h, ref } from 'vue';

import { ApiComponent, globalShareState, IconPicker } from '@vben/common-ui';

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Image,
  Input,
  InputNumber,
  InputPassword,
  Mentions,
  notification,
  Popconfirm,
  Radio,
  RadioGroup,
  RangePicker,
  Rate,
  Select,
  Space,
  Switch,
  Textarea,
  TimePicker,
  TreeSelect,
  TypographyTitle,
  Upload,
} from 'ant-design-vue';

import { Map } from './Map';
import { FileUpload, MyUpload } from './MyUpload';

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
  componentProps: Recordable<any> = {},
) => {
  return defineComponent({
    inheritAttrs: false,
    name: component.name,
    setup: (props: any, { attrs, expose, slots }) => {
      const placeholderText = type === 'input' ? '请输入' : '请选择';
      const placeholder =
        props?.placeholder || attrs?.placeholder || placeholderText;
      // 透传组件暴露的方法
      const innerRef = ref();
      const publicApi: Recordable<any> = {};
      expose(publicApi);
      const instance = getCurrentInstance();
      instance?.proxy?.$nextTick(() => {
        for (const key in innerRef.value) {
          if (typeof innerRef.value[key] === 'function') {
            publicApi[key] = innerRef.value[key];
          }
        }
      });
      return () =>
        h(
          component,
          { ...componentProps, placeholder, ...props, ...attrs, ref: innerRef },
          slots,
        );
    },
  });
};

// 这里需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType =
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'AutoComplete'
  | 'Cascader'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'DefaultButton'
  | 'Divider'
  | 'FileUpload'
  | 'IconPicker'
  | 'Image'
  | 'Input'
  | 'InputNumber'
  | 'InputPassword'
  | 'Map'
  | 'Mentions'
  | 'MyUpload'
  | 'Popconfirm'
  | 'PrimaryButton'
  | 'Radio'
  | 'RadioGroup'
  | 'RangePicker'
  | 'Rate'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'Textarea'
  | 'TimePicker'
  | 'TreeSelect'
  | 'TypographyTitle'
  | 'Upload'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // 如果你的组件体积比较大，可以使用异步加载
    // Button: () =>
    // import('xxx').then((res) => res.Button),
    ApiSelect: withDefaultPlaceholder(ApiComponent, 'select', {
      component: Select,
      loadingSlot: 'suffixIcon',
      visibleEvent: 'onDropdownVisibleChange',
      modelPropName: 'value',
    }),
    ApiTreeSelect: withDefaultPlaceholder(ApiComponent, 'select', {
      component: TreeSelect,
      fieldNames: { label: 'label', value: 'value', children: 'children' },
      loadingSlot: 'suffixIcon',
      modelPropName: 'value',
      optionsPropName: 'treeData',
      visibleEvent: 'onVisibleChange',
    }),
    ApiCascader: withDefaultPlaceholder(ApiComponent, 'select', {
      component: Cascader,
      loadingSlot: 'suffixIcon',
      visibleEvent: 'onDropdownVisibleChange',
      modelPropName: 'value',
    }),
    AutoComplete,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    // 自定义默认按钮
    DefaultButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'default' }, slots);
    },
    Divider,
    CustomDivider: (props, { attrs }) => {
      return h(Divider, { ...props, attrs }, props.children);
    },
    IconPicker: withDefaultPlaceholder(IconPicker, 'select', {
      iconSlot: 'addonAfter',
      inputComponent: Input,
      modelValueProp: 'value',
    }),
    Input: withDefaultPlaceholder(Input, 'input'),
    InputNumber: withDefaultPlaceholder(InputNumber, 'input'),
    InputPassword: withDefaultPlaceholder(InputPassword, 'input'),
    Mentions: withDefaultPlaceholder(Mentions, 'input'),
    // 自定义主要按钮
    PrimaryButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'primary' }, slots);
    },
    Radio,
    RadioGroup,
    RangePicker,
    Rate,
    Select: withDefaultPlaceholder(Select, 'select'),
    Space,
    Switch,
    Textarea: withDefaultPlaceholder(Textarea, 'input'),
    TimePicker,
    TreeSelect: withDefaultPlaceholder(TreeSelect, 'select'),
    Upload,
    Popconfirm,
    Cascader: withDefaultPlaceholder(Cascader, 'select'),
    Map,
    MyUpload,
    FileUpload,
    TypographyTitle,
    Image,
    CustomImage: (props, { attrs }) => {
      return h(Image, {
        ...props,
        src: `${import.meta.env.VITE_OSS_URL}${props.value}`,
        ...attrs,
      });
    },
  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copyPreferencesSuccess: (title, content) => {
      notification.success({
        description: content,
        message: title,
        placement: 'bottomRight',
      });
    },
  });
}

export { initComponentAdapter };
