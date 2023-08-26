import { type } from "os";
import { Kind } from "../selector/enums";

export type Link = {
    url: string,
    title?: string,
    icon?: string,
    type?: string
}

export type Spec = {
    type?: string,
    lifecycle?: string,
    owner?: string,
    system?: string,
    subcomponentOf?: string,
    providesApis?: string[],
    consumesApis?: string[],
    dependsOn?: string[],
    dependencyOf?: string,
    parameters?: any,
    steps?: any,
    definition?: any,
    profile?: any,
    parent?: any,
    children?: any,
    members?: any,
    memberOf?: any,
    domain?: string,
    target?: string,
    targets?: string,
    presence?: string
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