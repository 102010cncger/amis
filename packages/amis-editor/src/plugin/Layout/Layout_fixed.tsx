import {registerEditorPlugin} from 'amis-editor-core';
import {FlexPluginBase} from './FlexPluginBase';

export default class Layout_fixed extends FlexPluginBase {
  name = '悬浮容器';
  isBaseComponent = true;
  pluginIcon = 'layout-fixed-plugin';
  description = '常见布局：悬浮容器（基于 CSS Flex 实现的布局容器）。';
  tags = ['常见布局'];
  order = 503;
  scaffold: any = {
    type: 'wrapper',
    size: 'xs',
    body: [],
    style: {
      position: 'fixed',
      inset: 'auto 50px 50px auto',
      zIndex: 10,
      display: 'flex',
      minWidth: '80px',
      minHeight: '80px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    }
  };
}

registerEditorPlugin(Layout_fixed);