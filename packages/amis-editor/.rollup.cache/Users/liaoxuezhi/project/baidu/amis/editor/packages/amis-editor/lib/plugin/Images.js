import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { mockValue } from 'amis-editor-core';
var ImagesPlugin = /** @class */ (function (_super) {
    __extends(ImagesPlugin, _super);
    function ImagesPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'images';
        _this.$schema = '/schemas/ImagesSchema.json';
        // 组件名称
        _this.name = '图片集';
        _this.isBaseComponent = true;
        _this.description = '展示多张图片';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-clone';
        _this.scaffold = {
            type: 'images'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { listClassName: 'nowrap', thumbMode: 'cover', value: [
                {
                    title: '图片1',
                    image: mockValue({ type: 'image' }),
                    src: mockValue({ type: 'image' })
                },
                {
                    title: '图片2',
                    image: mockValue({ type: 'image' }),
                    src: mockValue({ type: 'image' })
                }
            ] });
        _this.panelTitle = '图片集';
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '常规',
                        body: (isUnderField
                            ? []
                            : [
                                {
                                    type: 'formula',
                                    name: '__mode',
                                    autoSet: false,
                                    formula: '!this.name && !this.source && Array.isArray(this.options) ? 2 : 1'
                                },
                                {
                                    label: '数据源',
                                    name: '__mode',
                                    type: 'button-group-select',
                                    size: 'xs',
                                    mode: 'inline',
                                    className: 'w-full',
                                    options: [
                                        {
                                            label: '关联字段',
                                            value: 1
                                        },
                                        {
                                            label: '静态设置',
                                            value: 2
                                        }
                                    ],
                                    onChange: function (value, oldValue, model, form) {
                                        if (value !== oldValue && value == 1) {
                                            form.deleteValueByName('options');
                                        }
                                    }
                                },
                                {
                                    name: 'source',
                                    type: 'input-text',
                                    label: '关联数据',
                                    description: '比如：\\${listVar}，用来关联作用域中的已有数据。',
                                    visibleOn: 'this.__mode == 1'
                                },
                                {
                                    type: 'combo',
                                    name: 'options',
                                    visibleOn: 'this.__mode == 2',
                                    minLength: 1,
                                    label: '图片集数据',
                                    multiple: true,
                                    multiLine: true,
                                    addable: true,
                                    removable: true,
                                    items: [
                                        getSchemaTpl('imageUrl', {
                                            name: 'image',
                                            label: '缩略图'
                                        }),
                                        getSchemaTpl('imageUrl', {
                                            name: 'src',
                                            label: '原图'
                                        }),
                                        {
                                            type: 'input-text',
                                            label: '图片标题',
                                            name: 'title'
                                        },
                                        {
                                            type: 'textarea',
                                            label: '图片描述',
                                            name: 'caption'
                                        }
                                    ]
                                }
                            ]).concat([
                            getSchemaTpl('imageUrl', {
                                name: 'defaultImage',
                                label: '无数据时显示的图片'
                            })
                        ])
                    },
                    {
                        title: '外观',
                        body: [
                            getSchemaTpl('switch', {
                                name: 'enlargeAble',
                                label: '开启图片放大功能'
                            }),
                            {
                                name: 'originalSrc',
                                visibleOn: 'this.enlargeAble',
                                type: 'input-text',
                                label: '原图地址',
                                description: '如果不配置将默认使用缩略图地址。'
                            },
                            getSchemaTpl('switch', {
                                name: 'showDimensions',
                                label: '是否显示图片尺寸'
                            }),
                            {
                                name: 'thumbMode',
                                type: 'button-group-select',
                                label: '缩略图展示模式',
                                size: 'sm',
                                pipeIn: defaultValue('contain'),
                                options: [
                                    {
                                        label: '宽度占满',
                                        value: 'w-full'
                                    },
                                    {
                                        label: '高度占满',
                                        value: 'h-full'
                                    },
                                    {
                                        label: '包含',
                                        value: 'contain'
                                    },
                                    {
                                        label: '铺满',
                                        value: 'cover'
                                    }
                                ]
                            },
                            {
                                name: 'thumbRatio',
                                type: 'button-group-select',
                                label: '缩略图比率',
                                size: 'sm',
                                pipeIn: defaultValue('1:1'),
                                options: [
                                    {
                                        label: '1:1',
                                        value: '1:1'
                                    },
                                    {
                                        label: '4:3',
                                        value: '4:3'
                                    },
                                    {
                                        label: '16:9',
                                        value: '16:9'
                                    }
                                ]
                            },
                            getSchemaTpl('className', {
                                autoComplete: false
                            }),
                            getSchemaTpl('className', {
                                name: 'listClassName',
                                label: '图片列表 CSS 类名'
                            })
                        ]
                    },
                    {
                        title: '显隐',
                        body: [
                            // getSchemaTpl('ref'),
                            getSchemaTpl('visible')
                        ]
                    }
                ])
            ];
        };
        return _this;
    }
    return ImagesPlugin;
}(BasePlugin));
export { ImagesPlugin };
registerEditorPlugin(ImagesPlugin);
