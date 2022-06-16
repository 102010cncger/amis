import { __spreadArray } from "tslib";
import { setSchemaTpl, getSchemaTpl, defaultValue } from 'amis-editor-core';
import kebabCase from 'lodash/kebabCase';
setSchemaTpl('style:formItem', function (_a) {
    var renderer = _a.renderer, schema = _a.schema;
    return {
        title: '表单项',
        key: 'formItem',
        body: [
            getSchemaTpl('formItemMode'),
            getSchemaTpl('labelHide'),
            getSchemaTpl('horizontal'),
            (renderer === null || renderer === void 0 ? void 0 : renderer.sizeMutable) !== false ? getSchemaTpl('formItemSize') : null
            // getSchemaTpl('formItemInline')
        ].concat(schema)
    };
});
setSchemaTpl('style:classNames', function (config) {
    var _a = config || {}, _b = _a.isFormItem, isFormItem = _b === void 0 ? true : _b, _c = _a.schema, schema = _c === void 0 ? [] : _c;
    return {
        title: 'CSS 类名',
        body: (isFormItem
            ? [
                getSchemaTpl('className', {
                    label: '表单项'
                }),
                getSchemaTpl('className', {
                    label: '标签',
                    name: 'labelClassName'
                }),
                getSchemaTpl('className', {
                    label: '控件',
                    name: 'inputClassName'
                })
            ]
            : [
                getSchemaTpl('className', {
                    label: '外层'
                })
            ]).concat(schema)
    };
});
setSchemaTpl('style:others', function (schemas) {
    if (schemas === void 0) { schemas = []; }
    return ({
        title: '其他项',
        body: __spreadArray([], schemas, true)
    });
});
setSchemaTpl('style:common', function (exclude) {
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (exclude
        ? Array.isArray(exclude)
            ? exclude
            : [exclude]
        : []).map(function (key) { return kebabCase(key); });
    return [
        {
            header: '布局',
            key: 'layout',
            body: [
                {
                    type: 'style-display',
                    label: false,
                    name: 'style'
                }
            ].filter(function (comp) { return !~exclude.indexOf(comp.type.replace(/^style-/i, '')); })
        },
        {
            header: '文字',
            key: 'font',
            body: [
                {
                    type: 'style-font',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '内外边距',
            key: 'box-model',
            body: [
                {
                    type: 'style-box-model',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '背景',
            key: 'background',
            body: [
                {
                    type: 'style-background',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '边框',
            key: 'border',
            body: [
                {
                    type: 'style-border',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '阴影',
            key: 'box-shadow',
            body: [
                {
                    type: 'style-box-shadow',
                    label: false,
                    name: 'style.boxShadow'
                }
            ]
        },
        {
            header: '其他',
            key: 'other',
            body: [
                {
                    label: '透明度',
                    name: 'style.opacity',
                    min: 0,
                    max: 1,
                    step: 0.05,
                    type: 'input-range',
                    pipeIn: defaultValue(1),
                    marks: {
                        '0%': '0',
                        '50%': '0.5',
                        '100%': '1'
                    }
                },
                {
                    label: '光标类型',
                    name: 'style.cursor',
                    type: 'select',
                    mode: 'row',
                    menuTpl: {
                        type: 'html',
                        html: "<span style='cursor:${value};'>${label}</span><code class='ae-Code'>${value}</code>",
                        className: 'ae-selection-code'
                    },
                    pipIn: defaultValue('default'),
                    options: [
                        { label: '默认', value: 'default' },
                        { label: '自动', value: 'auto' },
                        { label: '无指针', value: 'none' },
                        { label: '悬浮', value: 'pointer' },
                        { label: '帮助', value: 'help' },
                        { label: '文本', value: 'text' },
                        { label: '单元格', value: 'cell' },
                        { label: '交叉指针', value: 'crosshair' },
                        { label: '可移动', value: 'move' },
                        { label: '禁用', value: 'not-allowed' },
                        { label: '可抓取', value: 'grab' },
                        { label: '放大', value: 'zoom-in' },
                        { label: '缩小', value: 'zoom-out' }
                    ]
                }
            ]
        }
    ].filter(function (item) { return !~exclude.indexOf(item.key); });
});
/**
 * 样式相关的属性面板，因为预计会比较多所以拆出来
 */
export var styleTpl = {
    name: 'style',
    type: 'combo',
    label: '',
    noBorder: true,
    multiLine: true,
    items: [
        {
            type: 'fieldSet',
            title: '文字',
            body: [
                {
                    type: 'group',
                    body: [
                        {
                            label: '文字大小',
                            type: 'input-text',
                            name: 'fontSize'
                        },
                        {
                            label: '文字粗细',
                            name: 'fontWeight',
                            type: 'select',
                            options: ['normal', 'bold', 'lighter', 'bolder']
                        }
                    ]
                },
                {
                    type: 'group',
                    body: [
                        {
                            label: '文字颜色',
                            type: 'input-color',
                            name: 'color'
                        },
                        {
                            label: '对齐方式',
                            name: 'textAlign',
                            type: 'select',
                            options: [
                                'left',
                                'right',
                                'center',
                                'justify',
                                'justify-all',
                                'start',
                                'end',
                                'match-parent'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '背景',
            body: [
                {
                    label: '颜色',
                    name: 'backgroundColor',
                    type: 'input-color'
                },
                getSchemaTpl('imageUrl', {
                    name: 'backgroundImage'
                })
            ]
        },
        {
            type: 'fieldSet',
            title: '边距',
            body: [
                {
                    type: 'group',
                    label: '外边距',
                    body: [
                        {
                            label: '上',
                            name: 'marginTop',
                            type: 'input-text'
                        },
                        {
                            label: '右',
                            name: 'marginRight',
                            type: 'input-text'
                        },
                        {
                            label: '下',
                            name: 'marginBottom',
                            type: 'input-text'
                        },
                        {
                            label: '左',
                            name: 'marginLeft',
                            type: 'input-text'
                        }
                    ]
                },
                {
                    type: 'group',
                    label: '内边距',
                    body: [
                        {
                            label: '上',
                            name: 'paddingTop',
                            type: 'input-text'
                        },
                        {
                            label: '右',
                            name: 'paddingRight',
                            type: 'input-text'
                        },
                        {
                            label: '下',
                            name: 'paddingBottom',
                            type: 'input-text'
                        },
                        {
                            label: '左',
                            name: 'paddingLeft',
                            type: 'input-text'
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '边框',
            body: [
                {
                    type: 'group',
                    body: [
                        {
                            label: '样式',
                            name: 'borderStyle',
                            type: 'select',
                            options: ['none', 'solid', 'dotted', 'dashed']
                        },
                        {
                            label: '颜色',
                            name: 'borderColor',
                            type: 'input-color'
                        }
                    ]
                },
                {
                    type: 'group',
                    body: [
                        {
                            label: '宽度',
                            name: 'borderWidth',
                            type: 'input-text'
                        },
                        {
                            label: '圆角宽度',
                            name: 'borderRadius',
                            type: 'input-text'
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '特效',
            body: [
                {
                    label: '透明度',
                    name: 'opacity',
                    min: 0,
                    max: 1,
                    step: 0.05,
                    type: 'input-range',
                    pipeIn: defaultValue(1)
                },
                {
                    label: '阴影',
                    name: 'boxShadow',
                    type: 'input-text'
                }
            ]
        }
    ]
};
