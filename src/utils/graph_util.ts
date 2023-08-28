import { IReduxState } from 'redux/store';
import { Kind, Relation } from 'utils/contants';
import { KindType, YAMLData } from 'views/graph/types';


export function getDefaultNodeData(kind: KindType, id: string): YAMLData {
    return {
        apiVersion: 'default',
        id,
        path: '',
        kind,
        metadata: {
            name: `new-${kind}`,
            title: `New ${kind}`
        }
    };
}

export function getAllKinds() {
    return [ Kind.API, Kind.Component, Kind.Resource, Kind.Domain, Kind.System, Kind.Group, Kind.User ];
}

export function getPossibleRelations(state: IReduxState, sourceID: string, targetId: string): string[] {
    const { entities } = state.catalog;
    let source, target;

    for (const entity of entities) {
        if (entity.id === sourceID) {
            source = entity;
        } else if (entity.id === targetId) {
            target = entity;
        }

        if (source && target) {
            break;
        }
    }
    if (!source || !target) {
        return [];
    }

    const { User, Group, Domain, System, Component, Resource, API } = Kind;
    const coreEntities = [ Domain, System, Component, Resource, API ];
    const orgEntities = [ User, Group ];

    const {
        memberOf,
        hasMember,
        ownedBy,
        ownerOf,
        partOf,
        hasPart,
        dependsOn,
        providesAPI,
        consumesAPI,
        parentOf,
        childOf
    } = Relation;
    const relations = [];

    if (source.data.kind === User) {
        if (target.data.kind === Group) {
            relations.push(memberOf);
        } else {
            relations.push(ownerOf);
        }
    } else if (source.data.kind === Group) {
        if (target.data.kind === Group) {
            relations.push(parentOf);
            relations.push(childOf);
        } else if (target.data.kind === User) {
            relations.push(hasMember);
        } else {
            relations.push(ownerOf);
        }
    } else if (coreEntities.includes(source.data.kind) && orgEntities.includes(target.data.kind)) {
        relations.push(ownedBy);
    } else if (source.data.kind === System) {
        if ([ Component, Resource, API ].includes(target.data.kind)) {
            relations.push(hasPart);
        }
    } else if (source.data.kind === Resource && target.data.kind === System) {
        relations.push(partOf);
    } else if (source.data.kind === Component) {
        if (target.data.kind === System) {
            relations.push(partOf);
        } else if (target.data.kind === Resource || target.data.kind === Component) {
            relations.push(dependsOn);
        } else if (target.data.kind === API) {
            relations.push(providesAPI);
            relations.push(consumesAPI);
        }
    } else if (source.data.kind === API) {
        if (target.data.kind === System) {
            relations.push(partOf);
        }
    }


    return relations;
}

function getID(data: YAMLData) {
    if (data.metadata.namespace) {
        return `${data.metadata.namespace}/${data.metadata.name}`;
    }

    return data.metadata.name;
}

export function getAllOwners(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        const kind = entity.data.kind;

        if (kind === Kind.Group || kind === Kind.User) {
            res.push(`${kind.toLowerCase()}:${entity.id}`);
        }
    }

    return res;
}

export function getAllSystems(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        if (entity.data.kind === Kind.System) {
            res.push(getID(entity.data));
        }
    }

    return res;

}

export function getAllComponents(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        if (entity.data.kind === Kind.Component) {
            res.push(getID(entity.data));
        }
    }

    return res;

}


export function getAllAPIs(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        if (entity.data.kind === Kind.API) {
            res.push(getID(entity.data));
        }
    }

    return res;
}

export function getAllPossibleDependencies(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        const kind = entity.data.kind;

        if (kind === Kind.Resource || kind === Kind.Component) {
            res.push(`${kind.toLowerCase()}:${entity.id}`);
        }
    }

    return res;
}

export function getAllGroups(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        if (entity.data.kind === Kind.Group) {
            res.push(getID(entity.data));
        }
    }

    return res;
}

export function getAllUsers(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        if (entity.data.kind === Kind.User) {
            res.push(getID(entity.data));
        }
    }

    return res;
}

export function getAllDomains(state: IReduxState): string[] {
    const { entities } = state.catalog;
    const res: string[] = [];

    for (const entity of entities) {
        if (entity.data.kind === Kind.Domain) {
            res.push(getID(entity.data));
        }
    }

    return res;
}

