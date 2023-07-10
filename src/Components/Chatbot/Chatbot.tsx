import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { Box } from 'grommet';
import 'src/components/Chatbot/Chatbot.scss';
import RappidService from 'src/services/rappid.service';
import JsonEditor from 'src/components/Chatbot/JsonEditor/JsonEditor';
import Inspector from 'src/components/Chatbot/Inspector/Inspector';
import EventBusServiceContext from 'src/services/event-bus-service.context';
import { EventBusService } from 'src/services/event-bus.service';
import { SharedEvents } from 'src/rappid/controller';
import { importGraphFromJSON, loadStencilShapes, zoomToFit } from 'src/rappid/actions';
import { STENCIL_WIDTH } from 'src/theme';
import { dataMigrationOptions } from 'src/Config/dataMigrationOptions';

import exampleGraphJSON from 'src/rappid/config/example-graph.json';
import LeftSideBar from '../SideBar/LeftSideBar';

const Chatbot = (): ReactElement => {

    const elementRef = useRef(null);
    const toolbarRef = useRef(null);
    const stencilRef = useRef(null);
    const paperRef = useRef(null);

    const [rappid, setRappid] = useState(null);
    const [inspectorWidth, setInspectorWidth] = useState(0)
    const [eventBusService] = useState(new EventBusService());
    const [stencilOpened, setStencilOpened] = useState(true);
    const [jsonEditorOpened, setJsonEditorOpened] = useState(true);
    const [fileJSON, setFileJSON] = useState(null);
    const [subscriptions] = useState(new Subscription());
  const [toolbarProjects, setToolbarProjects] = useState([]);


    const addToolbarElement = () => {
        setToolbarProjects((project) => [...project, 'Project 1']);
      };

    const openFile = useCallback((json: Object): void => {
        setFileJSON(json);
        importGraphFromJSON(rappid, json);
        zoomToFit(rappid);
    }, [rappid]);

    const onStart = useCallback((): void => {
        loadStencilShapes(rappid);
        openFile(exampleGraphJSON);
    }, [rappid, openFile]);

    const onJsonEditorChange = useCallback((json: Object): void => {
        if (rappid) {
            importGraphFromJSON(rappid, json);
        }
    }, [rappid]);

    const onRappidGraphChange = useCallback((json: Object): void => {
        setFileJSON(json);
    }, []);

    const onStencilToggle = useCallback((): void => {
        if (!rappid) {
            return;
        }
        const { scroller, stencil } = rappid;
        if (stencilOpened) {
            stencil.unfreeze();
            scroller.el.scrollLeft += STENCIL_WIDTH;
        } else {
            stencil.freeze();
            scroller.el.scrollLeft -= STENCIL_WIDTH;
        }
    }, [rappid, stencilOpened]);

    const toggleJsonEditor = (): void => {
        setJsonEditorOpened(!jsonEditorOpened);
    };

    const toggleStencil = (): void => {
        setStencilOpened(!stencilOpened);
    };

    useEffect((): void => {
        onStencilToggle();
    }, [stencilOpened, onStencilToggle]);

    const setStencilContainerSize = useCallback((): void => {
        stencilRef.current.style.width = `${STENCIL_WIDTH}%`;
    }, []);

    useEffect(() => {
        subscriptions.add(
            eventBusService.on(SharedEvents.GRAPH_CHANGED, (json: Object) => onRappidGraphChange(json))
        );
        subscriptions.add(
            eventBusService.on(SharedEvents.JSON_EDITOR_CHANGED, (json: Object) => onJsonEditorChange(json))
        );
    }, [eventBusService, subscriptions, onRappidGraphChange, onJsonEditorChange]);

    useEffect(() => {
        setRappid(new RappidService(
            elementRef.current,
            paperRef.current,
            stencilRef.current,
            toolbarRef.current,
            eventBusService
        ));
    }, [eventBusService]);

    useEffect(() => {
        if (!rappid) {
            return;
        }
        setStencilContainerSize();
        onStart();
    }, [rappid, onStart, setStencilContainerSize]);

    useEffect(() => {
        if (!rappid) {
            return;
        }
        return () => {
            subscriptions.unsubscribe();
            rappid.destroy();
        };
    }, [rappid, subscriptions]);

    return (

        <EventBusServiceContext.Provider value={eventBusService}>
            <Box ref={elementRef} direction='row' className="rappid-scope chatbot">
                <Box ref={toolbarRef} ></Box>
                <Box className="side-bar" width='20%'>
                <LeftSideBar className="side-bar"
                addToolbarElement={addToolbarElement}
                sidebaroptions={dataMigrationOptions}
                title='Data Migration'
      />
                    {/* <div className="toggle-bar">
                        <div onClick={toggleStencil}
                            className={'icon toggle-stencil ' + (!stencilOpened ? 'disabled-icon' : '')}
                            data-tooltip="Toggle Element Palette"
                            data-tooltip-position-selector=".toggle-bar" />
                        <div onClick={toggleJsonEditor}
                            className={'icon toggle-editor ' + (!jsonEditorOpened ? 'disabled-icon' : '')}
                            data-tooltip="Toggle JSON Editor"
                            data-tooltip-position-selector=".toggle-bar" />
                    </div> */}
                    <Box  className="stencil-container" width='100%' ref={stencilRef}
                        style={{ display: stencilOpened ? 'initial' : 'none'}}
                         />
                            
                         
                </Box>
                <Box flex className="main-container">
                    <Box flex ref={paperRef} className="paper-container" />
                    {/* <div style={{ display: jsonEditorOpened ? 'initial' : 'none' }}>
                        <JsonEditor content={fileJSON}/>
                    </div> */}
                </Box>
               
            <Inspector />
            </Box>
        </EventBusServiceContext.Provider>
    );
};

export default Chatbot;
