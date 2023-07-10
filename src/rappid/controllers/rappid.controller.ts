/*! JointJS+ v3.7.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-07-03 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia, shapes, util } from '@clientio/rappid';

import RappidService from 'src/services/rappid.service';
import { Controller, SharedEvents } from 'src/rappid/controller';
import * as actions from 'src/rappid/actions';
import { ZOOM_MIN, ZOOM_MAX, ZOOM_STEP } from 'src/theme';

const DEBOUNCE_TIME_MS = 500;

export class RappidController extends Controller {

    startListening() {

        const { graph, paper, toolbar, history, eventBusService } = this.service;

        this.listenTo(eventBusService, {
            [SharedEvents.GRAPH_START_BATCH]: onGraphStartBatch,
            [SharedEvents.GRAPH_STOP_BATCH]: onGraphStopBatch,
        });

        this.listenTo(graph, {
            'add': onCellAdd,
            'remove': onCellRemove,
            'change:ports': onElementPortsChange,
        });

        this.listenTo(history, {
            'stack': util.debounce(onHistoryChange, DEBOUNCE_TIME_MS),
        });

        this.listenTo(paper, {
            'paper:pinch': onPaperPinch,
            'paper:pan': onPaperPan,
            'blank:pointerdown': onPaperBlankPointerdown,
            'cell:pointerup': onPaperCellPointerup,
            'cell:tool:remove': onPaperCellToolRemove,
            'element:pointermove': onPaperElementPointermove,
            'element:pointerup': onPaperElementPointerup,
            'element:port:add': onPaperElementPortAdd,
            'element:port:remove': onPaperElementPortRemove,
            'scale': onPaperScale,
        });

        this.listenTo(toolbar, {
            'png:pointerclick': onToolbarPNGPointerclick,
        });
    }
}

// Event Bus Service

function onGraphStartBatch(service: RappidService, batchName: string): void {
    const { graph } = service;
    graph.startBatch(batchName);
}

function onGraphStopBatch(service: RappidService, batchName: string): void {
    const { graph } = service;
    graph.stopBatch(batchName);
}

// Graph

function onCellAdd(service: RappidService, cell: dia.Cell): void {
    if (cell.isLink()) return;
    actions.setSelection(service, [cell]);
    actions.updateLinksRouting(service);
}

function onCellRemove(service: RappidService, removedCell: dia.Cell): void {
    const { selection } = service;
    if (!selection.includes(removedCell)) return;
    actions.setSelection(service, selection.filter(cell => cell !== removedCell));
    if (removedCell.isElement()) {
        actions.updateLinksRouting(service);
    }
}

function onElementPortsChange(_service: RappidService, message: shapes.app.Message): void {
    message.toggleAddPortButton('out');
}

function onHistoryChange(service: RappidService): void {
    const { graph, eventBusService } = service;
    eventBusService.emit(SharedEvents.GRAPH_CHANGED, graph.toJSON());
}

// Paper

function onPaperBlankPointerdown(service: RappidService, evt: dia.Event): void {
    const { scroller } = service;
    actions.setSelection(service, []);
    scroller.startPanning(evt);
}

function onPaperPinch(service: RappidService, evt: dia.Event, ox: number, oy: number, scale: number) {
    const { scroller } = service;
    evt.preventDefault();
    scroller.zoom(scale - 1, { min: ZOOM_MIN, max: ZOOM_MAX, grid: ZOOM_STEP, ox, oy });
}

function onPaperPan(service: RappidService, evt:dia.Event, tx: number, ty: number) {
    const { scroller } = service;
    evt.preventDefault();
    scroller.el.scrollLeft += tx;
    scroller.el.scrollTop += ty;
}

function onPaperCellPointerup(service: RappidService, cellView: dia.CellView): void {
    actions.setSelection(service, [cellView.model]);
}

function onPaperElementPointermove(service: RappidService, elementView: dia.ElementView, evt: dia.Event): void {
    const { paper } = service;
    const { data } = evt;
    // Run the code below on the first `pointermove` event only
    if (data.pointermoveCalled) return;
    data.pointermoveCalled = true;
    paper.hideTools();
}

function onPaperElementPointerup(service: RappidService, _elementView: dia.ElementView, evt: dia.Event): void {
    const { paper } = service;
    const { data } = evt;
    if (!data.pointermoveCalled) return;
    paper.showTools();
    actions.updateLinksRouting(service);
}

function onPaperElementPortAdd(_service: RappidService, elementView: dia.ElementView, evt: dia.Event): void {
    evt.stopPropagation();
    const message = elementView.model as shapes.app.Message;
    message.addDefaultPort();
}

function onPaperElementPortRemove(_service: RappidService, elementView: dia.ElementView, evt: dia.Event): void {
    evt.stopPropagation();
    const portId = elementView.findAttribute('port', evt.target);
    const message = elementView.model as shapes.app.Message;
    message.removePort(portId);
}

function onPaperCellToolRemove(_service: RappidService, cellView: dia.CellView, _evt: dia.Event): void {
    cellView.model.remove();
}

function onPaperScale(service: RappidService): void {
    const { tooltip } = service;
    tooltip.hide();
}

// Toolbar

function onToolbarPNGPointerclick(service: RappidService): void {
    actions.exportToPNG(service);
}
