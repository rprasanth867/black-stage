import { Kind } from "../selector/enums";
import { YAMLData } from "./types";

export function getDefaultNodeData(kind: Kind): YAMLData {
    return {
        apiVersion: 'default',
        kind: kind,
        metadata: {
            name: `new-${kind}`, 
            title: `New ${kind}`, 
        },
        specs: {

        }
    }
}