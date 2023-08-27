import { KindType } from 'views/graph/types';

import { Kind } from './contants';

const validateString = (rule: any, value: any, callback: any) => {
    // Regular expression pattern to match the given criteria
    const pattern = /^[a-zA-Z0-9]+([-_.]?[a-zA-Z0-9]+)*$/;

    // Check if the string matches the pattern and has the correct length
    if (pattern.test(value) && value.length >= 1 && value.length <= 63) {
        callback();
    } else {
        callback('Invalid input');
    }
};

export const metaDataRules = {
    name: [
        { required: true,
            message: 'name is required' },
        { validator: validateString }
    ],
    namespace: [
        { validator: validateString }
    ],
    title: [],
    description: [],
    labels: [],
    annotations: [],
    tags: [],
    links: []
};

export const getSupportedSpecs = (kind: KindType) => {
    switch (kind) {
    case Kind.Component: return [ 'type', 'lifecycle', 'owner', 'system', 'subcomponentOf',
        'providesApis', 'consumesApis', 'dependsOn' ];
    case Kind.API: return [ 'type', 'lifecycle', 'owner', 'system', 'definition' ];
    case Kind.Resource: return [ 'owner', 'type', 'system', 'dependsOn', 'dependencyOf' ];
    case Kind.System: return [ 'owner', 'domain' ];
    case Kind.Domain: return [ 'owner' ];
    case Kind.Group: return [ 'type', 'profile', 'parent', 'children', 'members' ];
    case Kind.User: return [ 'profile', 'memberOf' ];
    }
};

// const yamlRules = {
//     apiVersion: [
//         { required: true,
//             message: 'apiVersion is required' }
//     ],
//     metadata: [
//         { required: true,
//             message: 'apiVersion is required' }
//     ]
// };
