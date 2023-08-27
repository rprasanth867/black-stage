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
    apiConsumedBy?: string[],
    providesApis?: string[],
    consumesApis?: string[],
    dependsOn?: string[],
    dependencyOf?: string[],
    parameters?: string,//doubt
    steps?: string,//doubt
    definition?: any,
    profile?: {
        displayName?: string,
        email?: string,
        picture?: string
    },
    parent?: string,
    children?: string[],
    members?: string[],
    memberOf?: string[],
    domain?: string,
    target?: string,
    targets?: string[],
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

export type KindType = typeof Kind[keyof typeof Kind];
export type YAMLData = {
    id?: string;
    apiVersion: string;
    kind: KindType;
    metadata: Metadata;
    spec: Spec;
}