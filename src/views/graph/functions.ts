import { Kind } from "views/selector/enums";
import { KindType, YAMLData } from "./types";

export function getDefaultNodeData(kind: KindType): YAMLData {
    return {
        apiVersion: 'default',
        kind: kind,
        metadata: {
            name: `new-${kind}`, 
            title: `New ${kind}`, 
        },
        spec: {

        }
    }
}

export function getAllKinds() {
    return [Kind.API,Kind.Component,Kind.Resource,Kind.Domain,Kind.System,Kind.Group,Kind.User]
}