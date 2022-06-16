/// <reference types="react" />
import { BasePlugin } from 'amis-editor-core';
export declare class UUIDControlPlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    icon: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        name: string;
    };
    previewSchema: any;
    panelTitle: string;
    panelBody: {
        type: string;
        value: string;
    }[];
    renderRenderer(props: any): JSX.Element;
}
