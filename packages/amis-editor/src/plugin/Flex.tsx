/**
 * @file Flex 布局
 */
import {registerEditorPlugin} from 'amis-editor-core';
import {
  BasePlugin,
  PluginEvent
} from 'amis-editor-core';
import {getSchemaTpl} from 'amis-editor-core';
import type {
  BaseEventContext,
  EditorNodeType,
  RegionConfig,
  RendererJSONSchemaResolveEventContext
} from 'amis-editor-core';
import {tipedLabel} from '../component/BaseControl';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

export class FlexPlugin extends BasePlugin {
  // 关联渲染器名字
  rendererName = 'flex';
  $schema = '/schemas/FlexSchema.json';
  disabledRendererPlugin = false;

  // 组件名称
  name = '布局容器'; // 此前叫 "Flex 布局"
  isBaseComponent = true;
  icon = 'fa fa-columns';
  pluginIcon = 'flex-container-plugin';
  description = '布局容器 是基于 CSS Flex 实现的布局效果，它比 Grid 和 HBox 对子节点位置的可控性更强，比用 CSS 类的方式更易用';
  docLink = '/amis/zh-CN/components/flex';
  tags = ['容器'];
  scaffold = {
    type: 'flex',
    items: [
      {
        type: 'wrapper',
        body: '第一列'
      },
      {
        type: 'wrapper',
        body: '第二列'
      },
      {
        type: 'wrapper',
        body: '第三列'
      }
    ]
  };
  previewSchema = {
    ...this.scaffold
  };

  panelTitle = 'Flex';


  panelBodyCreator = (context: BaseEventContext) => {
    const curRendererSchema = context?.schema;
    const isRowContent = curRendererSchema?.direction === 'row' || curRendererSchema?.direction === 'row-reverse';
    return [
      getSchemaTpl('tabs', [
        {
          title: '属性',
          className: 'p-none',
          body: [
            getSchemaTpl('collapseGroup', [
              {
                title: '布局',
                body: [
                  getSchemaTpl('layout:position', {
                    name: 'style.position',
                    // mode: 'vertical',
                    value: 'static',
                    label: tipedLabel('定位模式', '指定当前容器元素的定位类型'),
                  }),
                  getSchemaTpl('layout:inset', {
                    name: 'style.inset',
                    mode: 'vertical',
                    label: tipedLabel('布局位置', '指定当前容器元素的定位位置，支持配置 top、right、bottom、left。'),
                    visibleOn: 'data.style.position && data.style.position !== "static"',
                    pipeIn: (value: any) => {
                      let curValue = value || 'auto';
                      if (isNumber(curValue)) {
                        curValue = curValue.toString();
                      } if (!isString(curValue)) {
                        curValue = '0';
                      }
                      const inset = curValue.split(' ');
                      return {
                        insetTop: inset[0] || 'auto',
                        insetRight: inset[1] || 'auto',
                        insetBottom: inset[2] || inset[0] || 'auto',
                        insetLeft: inset[3] || inset[1] || 'auto',
                      };
                    },
                    pipeOut: (value: any) => {
                      console.log('pipeOut:', value);
                      return `${value.insetTop ?? 'auto'} ${value.insetRight ?? 'auto'} ${value.insetBottom ?? 'auto'} ${value.insetLeft ?? 'auto'}`;
                    }
                  }),
                  getSchemaTpl('layout:z-index', {
                    name: 'style.zIndex',
                    mode: 'vertical',
                    label: tipedLabel('层级', '指定元素的堆叠顺序，层级高的元素总是会处于较低层级元素的上面。'),
                    visibleOn: 'data.style.position && data.style.position !== "static"'
                  }),
                  getSchemaTpl('layout:flexDirection', {
                    name: 'direction',
                    // mode: 'vertical',
                    value: 'row',
                    label: tipedLabel('排列方向', '设置成水平排列方向，则从左到右放置子项；设置成垂直排列方向，则从上到下放置子项')
                  }),
                  getSchemaTpl('layout:justifyContent', {
                    name: 'justify',
                    // mode: 'vertical', // 改成上下展示模式
                    label: tipedLabel(`${isRowContent ? '水平' : '垂直'}对齐方式`, '设置子元素在主轴上的对齐方式')
                  }),
                  getSchemaTpl('layout:alignItems', {
                    name: 'alignItems',
                    // mode: 'vertical',
                    label: tipedLabel(`${isRowContent ? '垂直' : '水平'}对齐方式`, '设置子元素在交叉轴上的对齐方式')
                  }),
                ]
              },
              {
                title: '子节点管理',
                body: [
                  {
                    name: 'items',
                    label: false,
                    type: 'combo',
                    scaffold: {
                      type: 'wrapper',
                      body: '子节点内容'
                    },
                    minLength: 2,
                    multiple: true,
                    // draggable: true,
                    draggableTip: '',
                    items: [
                      {
                        type: 'tpl',
                        tpl:
                          '<span class="label label-default">子节点${index | plus}</span>'
                      }
                    ]
                  }
                ]
              }
            ])
          ]
        },
        {
          title: '外观',
          className: 'p-none',
          body: getSchemaTpl('collapseGroup', [
            ...getSchemaTpl('style:common', ['display']),
            {
              title: 'CSS 类名',
              body: [getSchemaTpl('className', {label: '外层CSS类名'})]
            }
          ])
        },
        {
          title: '状态',
          body: [getSchemaTpl('visible'), getSchemaTpl('disabled')]
        }
      ])
    ];
  };

  regions: Array<RegionConfig> = [
    {
      key: 'items',
      label: '子节点集合',
      // 复写渲染器里面的 render 方法
      renderMethod: 'render',
      dndMode: 'position-h'
    }
  ];

  afterResolveJsonSchema(
    event: PluginEvent<RendererJSONSchemaResolveEventContext>
  ) {
    const context = event.context;
    const parent = context.node.parent?.host as EditorNodeType;

    if (parent?.info?.plugin === this) {
      event.setData('/schemas/FlexColumn.json');
    }
  }
}

registerEditorPlugin(FlexPlugin);
