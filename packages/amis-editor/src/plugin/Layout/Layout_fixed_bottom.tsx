import {registerEditorPlugin} from 'amis-editor-core';
import {FlexPluginBase, defaultFlexColumnSchema} from './FlexPluginBase';

export default class Layout_fixed_bottom extends FlexPluginBase {
  name = '吸底容器';
  isBaseComponent = true;
  pluginIcon = 'flex-container-plugin';
  description = '吸底容器: 基于 CSS Flex 实现的布局容器。';
  order = 501;
  scaffold: any = {
    type: 'flex',
    title: '吸底容器',
    className: 'p-1',
    items: [
      defaultFlexColumnSchema(),
      defaultFlexColumnSchema(),
      defaultFlexColumnSchema(),

    ],
    style: {
      position: 'fixed',
      inset: 'auto auto 0 0',
      zIndex: 2,
      width: '100%',
      overflowX: 'auto',
      margin: '0',
      overflowY: 'auto',
      height: 'auto'
    },
    isFixedWidth: true,
    direction: 'row',
    justify: 'center',
    alignItems: 'stretch',
    isFixedHeight: false,
    originPosition: 'right-bottom'
  };
  panelTitle = '吸底容器';
}

registerEditorPlugin(Layout_fixed_bottom);
