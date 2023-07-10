/*! JointJS+ v3.7.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-07-03 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import {
    CONFIRMATION_ICON,
    ENTITY_ICON,
    MESSAGE_ICON,
    USER_INPUT_ICON
} from 'src/theme';

export const stencilConfig = {
    shapes: [
        //     {
        //     name: 'FlowchartStart'
        // }, 
        // {
        //     name: 'FlowchartEnd'
        // }, 
        {
            name: 'Message',
            attrs: {
                label: { text: 'Source' },
                icon: { xlinkHref: USER_INPUT_ICON }
            }
        },
        {
            name: 'FlowchartEnd',
            attrs: {
                label: { text: 'Destination' },
                icon: { xlinkHref: ENTITY_ICON }
            }
        },
        // {
        //     name: 'Message',
        //     attrs: {
        //         label: { text: 'Message' },
        //         icon: { xlinkHref: MESSAGE_ICON }
        //     }
        // },
        // {
        //     name: 'Message',
        //     attrs: {
        //         label: { text: 'Confirmations' },
        //         icon: { xlinkHref: CONFIRMATION_ICON }
        //     }
        // }
    ]
};
