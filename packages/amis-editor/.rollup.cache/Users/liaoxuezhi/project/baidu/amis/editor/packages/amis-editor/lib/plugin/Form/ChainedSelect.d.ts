import { BasePlugin, BaseEventContext } from 'amis-editor-core';
import { RendererAction, RendererEvent } from 'amis-editor-comp/dist/renderers/event-action';
export declare class ChainedSelectControlPlugin extends BasePlugin {
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
        label: string;
        name: string;
        joinValues: boolean;
    };
    previewSchema: any;
    events: RendererEvent[];
    actions: RendererAction[];
    panelTitle: string;
    notRenderFormZone: boolean;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
}
