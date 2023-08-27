import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/store';
import { Kind, Relation } from 'utils/contants';

export class RelationUtil {
    static getPossibleRelations = (sourceID: string, targetId: string): string[] => {
        const { entities } = useSelector((state: IReduxState) => state.catalog);
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
    };
}
