import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { noop } from 'amis-editor-core';
import { getEventControlConfig } from '../util';
import { InlineModal } from './Dialog';
var DrawerPlugin = /** @class */ (function (_super) {
    __extends(DrawerPlugin, _super);
    function DrawerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'drawer';
        _this.$schema = '/schemas/DrawerSchema.json';
        // 组件名称
        _this.name = '抽屉式弹框';
        _this.isBaseComponent = true;
        _this.wrapperProps = {
            wrapperComponent: InlineModal,
            onClose: noop,
            resizable: false,
            show: true
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'renderBody',
                renderMethodOverride: function (regions, insertRegion) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var info = this.props.$$editor;
                        var dom = this.super.apply(this, args);
                        if (info && args[1] === 'body') {
                            return insertRegion(this, dom, regions, info, info.plugin.manager);
                        }
                        return dom;
                    };
                }
            },
            {
                key: 'actions',
                label: '按钮组',
                renderMethod: 'renderFooter',
                wrapperResolve: function (dom) { return dom; }
            }
        ];
        // 现在没用，后面弹窗优化后有用
        _this.events = [
            {
                eventName: 'confirm',
                eventLabel: '确认',
                description: '确认'
            },
            {
                eventName: 'cancel',
                eventLabel: '取消',
                description: '取消'
            }
        ];
        _this.actions = [
            {
                actionType: 'confirm',
                actionLabel: '确认',
                description: '确认操作'
            },
            {
                actionType: 'cancel',
                actionLabel: '取消',
                description: '取消操作'
            },
            {
                actionType: 'setValue',
                actionLabel: '更新数据',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '弹框';
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '常规',
                    body: [
                        {
                            label: '标题',
                            type: 'input-text',
                            name: 'title'
                        },
                        // {
                        //   children: (
                        //     <Button
                        //       size="sm"
                        //       className="m-b-sm"
                        //       level="info"
                        //       block
                        //       onClick={() => this.manager.showInsertPanel('body')}
                        //     >
                        //       新增内容
                        //     </Button>
                        //   )
                        // },
                        {
                            type: 'divider'
                        },
                        {
                            label: '位置',
                            type: 'button-group-select',
                            name: 'position',
                            value: 'right',
                            size: 'sm',
                            mode: 'inline',
                            className: 'block',
                            options: [
                                {
                                    label: '左',
                                    value: 'left'
                                },
                                {
                                    label: '上',
                                    value: 'top'
                                },
                                {
                                    label: '右',
                                    value: 'right'
                                },
                                {
                                    label: '下',
                                    value: 'bottom'
                                }
                            ],
                            description: '定义弹框从什么位置呼出'
                        },
                        getSchemaTpl('switch', {
                            label: '数据映射',
                            name: 'data',
                            className: 'm-b-xs',
                            pipeIn: function (value) { return !!value; },
                            pipeOut: function (value) { return (value ? { '&': '$$' } : null); }
                        }),
                        {
                            type: 'tpl',
                            visibleOn: '!this.data',
                            tpl: '<p class="text-sm text-muted">当没开启数据映射时，弹框中默认会拥有触发打开弹框按钮所在环境的所有数据。</p>'
                        },
                        {
                            type: 'input-kv',
                            syncDefaultValue: false,
                            name: 'data',
                            visibleOn: 'this.data',
                            descriptionClassName: 'help-block text-xs m-b-none',
                            description: '<p>当开启数据映射时，弹框中的数据只会包含设置的部分，请绑定数据。如：<code>{"a": "\\${a}", "b": 2}</code></p><p>如果希望在默认的基础上定制，请先添加一个 Key 为 `&` Value 为 `\\$$` 作为第一行。</p><div>当值为 <code>__undefined</code>时，表示删除对应的字段，可以结合<code>{"&": "\\$$"}</code>来达到黑名单效果。</div>'
                        },
                        getSchemaTpl('switch', {
                            name: 'closeOnOutside',
                            label: '点击外部关闭弹框'
                        }),
                        getSchemaTpl('switch', {
                            label: '按 Esc 可关闭',
                            name: 'closeOnEsc'
                        })
                    ]
                },
                {
                    title: '外观',
                    body: [
                        {
                            label: '尺寸',
                            type: 'button-group-select',
                            name: 'size',
                            size: 'sm',
                            mode: 'inline',
                            className: 'block',
                            options: [
                                {
                                    label: '超小',
                                    value: 'xs'
                                },
                                {
                                    label: '小',
                                    value: 'sm'
                                },
                                {
                                    label: '中',
                                    value: 'md'
                                },
                                {
                                    label: '大',
                                    value: 'lg'
                                },
                                {
                                    label: '超大',
                                    value: 'xl'
                                }
                            ]
                        },
                        getSchemaTpl('switch', {
                            name: 'overlay',
                            label: '是否显示蒙层',
                            pipeIn: defaultValue(true)
                        }),
                        getSchemaTpl('switch', {
                            name: 'resizable',
                            label: '可拉拽',
                            description: '定义弹框是否可拉拽调整大小',
                            pipeIn: defaultValue(false)
                        }),
                        getSchemaTpl('className'),
                        getSchemaTpl('className', {
                            label: 'bodyClassName 类名',
                            name: 'bodyClassName'
                        })
                    ]
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(_this.manager, context)))
                    ]
                }
            ]);
        };
        return _this;
    }
    DrawerPlugin.prototype.buildSubRenderers = function () { };
    return DrawerPlugin;
}(BasePlugin));
export { DrawerPlugin };
registerEditorPlugin(DrawerPlugin);
