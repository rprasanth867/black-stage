import { Kind } from "../selector/enums";

export type Link = {
    url: string,
    title?: string,
    icon?: string,
    type?: string
}

export type Metadata = {
    name: string;
    namespace?: string;
    uid?: string;
    title?: string;
    description?: string;
    labels?: {[key: string]: string};
    annotations?: {[key: string]: string};
    tags?: string[];
    links?: Link[];
}

export type YAMLData = {
    id?: string;
    apiVersion: string;
    kind: Kind;
    metadata: Metadata;
    specs: any;
}