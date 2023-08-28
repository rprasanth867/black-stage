import { Entity as EntityType, Relation as RelationType } from 'redux/reducers/catalog';
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


export function getUpdatedRelations(entities: EntityType[]): RelationType[] {
    const relations: any = [];
    const foundRels: string[] = [];

    const formID = (name: string): string => {
        let id = name;

        if (name.includes(':')) {
            const parts = name.split(':');

            id = parts[1];
        }

        if (!id.includes('/')) {
            id = `default/${id}`;
        }

        return id;
    };

    const addRelation = (source: string, target: string, value: string) => {
        const id = `${source}:${target}`;

        if (!foundRels.includes(id)) {
            relations.push({
                'id': id,
                'source': source,
                'target': target,
                'label': value,
                'type': 'buttonedge'
            });
            foundRels.push(id);
        }
    };

    for (const entityX of entities) {
        const entity = { ...entityX.data };

        if (entity.kind === Kind.Location || entity.kind === Kind.Domain) {
            // eslint-disable-next-line no-continue
            continue;
        }
        if (!entity.spec) {
            // eslint-disable-next-line no-continue
            continue;
        }
        if (entity.kind === Kind.Component) {
            const { owner, system, subcomponentOf, providesApis, consumesApis, dependsOn } = entity.spec;

            if (owner) {
                addRelation(entity.id, formID(owner), Relation.ownedBy);
            }
            if (system) {
                addRelation(formID(system), entity.id, Relation.hasPart);
            }
            if (subcomponentOf) {
                addRelation(formID(subcomponentOf), entity.id, Relation.hasPart);
            }

            if (providesApis) {
                for (const api of providesApis) {
                    addRelation(entity.id, formID(api), Relation.providesAPI);
                }
            }

            if (consumesApis) {
                for (const api of consumesApis) {
                    addRelation(entity.id, formID(api), Relation.consumesAPI);
                }
            }

            if (dependsOn) {
                for (const ent of dependsOn) {
                    addRelation(entity.id, formID(ent), Relation.dependsOn);
                }
            }


        } else if (entity.kind === Kind.API) {
            const { owner, system } = entity.spec;

            if (owner) {
                addRelation(entity.id, formID(owner), Relation.ownedBy);
            }

            if (system) {
                addRelation(formID(system), entity.id, Relation.hasPart);
            }
        } else if (entity.kind === Kind.Group) {
            const { parent, children, members } = entity.spec;

            if (parent) {
                addRelation(formID(parent), entity.id, Relation.parentOf);
            }

            if (children) {
                for (const child of children) {
                    addRelation(entity.id, formID(child), Relation.parentOf);
                }
            }

            if (members) {
                for (const member of members) {
                    addRelation(entity.id, formID(member), Relation.hasMember);
                }
            }

        } else if (entity.kind === Kind.User) {
            const { memberOf } = entity.spec;

            if (memberOf) {
                for (const group of memberOf) {
                    addRelation(formID(group), entity.id, Relation.hasMember);
                }
            }
        } else if (entity.kind === Kind.Resource) {
            const { owner, system, dependsOn, dependencyOf } = entity.spec;

            if (owner) {
                addRelation(entity.id, formID(owner), Relation.ownedBy);
            }

            if (dependsOn) {
                for (const ent of dependsOn) {
                    addRelation(entity.id, formID(ent), Relation.dependsOn);
                }
            }

            if (system) {
                addRelation(formID(system), entity.id, Relation.hasPart);
            }

            if (dependencyOf) {
                for (const main of dependencyOf) {
                    addRelation(formID(main), entity.id, Relation.dependsOn);
                }
            }

        } else if (entity.kind === Kind.System) {
            const { domain, owner } = entity.spec;

            if (owner) {
                addRelation(entity.id, formID(owner), Relation.ownedBy);
            }
            if (domain) {
                addRelation(formID(domain), entity.id, Relation.hasPart);
            }
        } else if (entity.kind === Kind.Domain) {
            const { owner } = entity.spec;

            if (owner) {
                addRelation(entity.id, formID(owner), Relation.ownedBy);
            }
        }
    }

    return relations;

}