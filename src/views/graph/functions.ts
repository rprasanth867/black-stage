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