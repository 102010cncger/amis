/**
 * 组件专有动作选择器
 */

import {Option, Select} from 'amis';
import {RendererProps} from 'amis-core';
import React from 'react';

// 动作基本配置项
export const BASE_ACTION_PROPS = [
  'actionType',
  '__actionDesc',
  'preventDefault',
  'stopPropagation',
  'expression',
  'outputVar'
];

export default class CmptActionSelect extends React.Component<RendererProps> {
  onChange(option: Option) {
    const {formStore} = this.props;
    let removeKeys: {
      [key: string]: any;
    } = {};

    // 保留必须字段，其他过滤掉
    Object.keys(formStore.data).forEach((key: string) => {
      if (
        ![
          ...BASE_ACTION_PROPS,
          'componentId',
          '__rendererName',
          '__rendererLabel',
          '__componentTreeSource',
          '__showSelectCmpt'
        ].includes(key)
      ) {
        removeKeys[key] = undefined;
      }
    });

    formStore.setValues({
      ...removeKeys,
      args: undefined,
      __cmptActionType: option.value,
      __cmptActionDesc: option.description
    });

    this.props.onChange(option.value);
  }
  render() {
    const {data, formStore, pluginActions} = this.props;
    // 根据type 从组件树中获取actions
    const actions = pluginActions[data.__rendererName] || [];

    return (
      <Select
        value={formStore.data.__cmptActionType}
        className="cmpt-action-select"
        options={actions.map((item: any) => ({
          label: item.actionLabel,
          value: item.actionType,
          description: item.description
        }))}
        onChange={this.onChange.bind(this)}
        clearable={false}
      />
    );
  }
}
