import { Kind } from "../selector/enums";

export type Metadata = {
    name: string;
    namespace?: string;
    uid?: string;
    title?: string;
    description?: string;
    labels?:object;
    annotations?: object;
    tags?: string[];
    links?: object;
}

export type YAMLData = {
    apiVersion: string;
    kind: Kind;
    metadata: Metadata;
    specs: any;
}