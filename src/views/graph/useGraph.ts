import { Kind, Relation } from 'utils/contants';

const getID = (name: string): string => {
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

export type IRelation = {
   id: string;
   source: string;
   target: string;
   value: string;
};

function useGraph(fullData: any) {
    const entities = [];
    const relations: IRelation[] = [];
    const foundRels: string[] = [];

    const addRelation = (source: string, target: string, value: string) => {
        const id = `${source}:${target}`;

        if (!foundRels.includes(id)) {
            relations.push({
                'id': id,
                'source': source,
                'target': target,
                'value': value
            });
            foundRels.push(id);
        }
    };

    for (const data of fullData) {
        const entity = { ...data.entity };

        if (entity.kind === Kind.Location || entity.kind === Kind.Template) {
            // eslint-disable-next-line no-continue
            continue;
        }
        entity.id = data.id;
        entity.path = data.path;
        entities.push(entity);
        if (!entity.spec) {
            // eslint-disable-next-line no-continue
            continue;
        }
        if (entity.kind === Kind.Component) {
            const { owner, system, subcomponentOf, providesApis, consumesApis, dependsOn } = entity.spec;

            if (owner) {
                addRelation(entity.id, getID(owner), Relation.ownedBy);
            }
            if (system) {
                addRelation(getID(system), entity.id, Relation.hasPart);
            }
            if (subcomponentOf) {
                addRelation(getID(subcomponentOf), entity.id, Relation.hasPart);
            }

            if (providesApis) {
                for (const api of providesApis) {
                    addRelation(entity.id, getID(api), Relation.providesAPI);
                }
            }

            if (consumesApis) {
                for (const api of consumesApis) {
                    addRelation(entity.id, getID(api), Relation.consumesAPI);
                }
            }

            if (dependsOn) {
                for (const ent of dependsOn) {
                    addRelation(entity.id, getID(ent), Relation.dependsOn);
                }
            }


        } else if (entity.kind === Kind.API) {
            const { owner, system } = entity.spec;

            if (owner) {
                addRelation(entity.id, getID(owner), Relation.ownedBy);
            }

            if (system) {
                addRelation(getID(system), entity.id, Relation.hasPart);
            }
        } else if (entity.kind === Kind.Group) {
            const { parent, children, members } = entity.spec;

            if (parent) {
                addRelation(getID(parent), entity.id, Relation.parentOf);
            }

            if (children) {
                for (const child of children) {
                    addRelation(entity.id, getID(child), Relation.parentOf);
                }
            }

            if (members) {
                for (const member of members) {
                    addRelation(entity.id, getID(member), Relation.hasMember);
                }
            }

        } else if (entity.kind === Kind.User) {
            const { memberOf } = entity.spec;

            if (memberOf) {
                for (const group of memberOf) {
                    addRelation(getID(group), entity.id, Relation.hasMember);
                }
            }
        } else if (entity.kind === Kind.Resource) {
            const { owner, system, dependsOn, dependencyOf } = entity.spec;

            if (owner) {
                addRelation(entity.id, getID(owner), Relation.ownedBy);
            }

            if (dependsOn) {
                for (const ent of dependsOn) {
                    addRelation(entity.id, getID(ent), Relation.dependsOn);
                }
            }

            if (system) {
                addRelation(getID(system), entity.id, Relation.hasPart);
            }

            if (dependencyOf) {
                for (const main of dependencyOf) {
                    addRelation(getID(main), entity.id, Relation.dependsOn);
                }
            }

        } else if (entity.kind === Kind.System) {
            const { domain, owner } = entity.spec;

            if (owner) {
                addRelation(entity.id, getID(owner), Relation.ownedBy);
            }
            if (domain) {
                addRelation(getID(domain), entity.id, Relation.hasPart);
            }
        } else if (entity.kind === Kind.Domain) {
            const { owner } = entity.spec;

            if (owner) {
                addRelation(entity.id, getID(owner), Relation.ownedBy);
            }
        }
    }

    return { entities,
        relations };
}

export default useGraph;
