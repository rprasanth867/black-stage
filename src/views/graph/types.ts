import { Kind } from 'utils/contants';

export type Link = {
    icon?: string;
    title?: string;
    type?: string;
    url: string;
};

export type Profile = {
    displayName?: string;
    email?: string;
    picture?: string;
};
export type Spec = {
    apiConsumedBy?: string[];
    children?: string[];
    consumesApis?: string[];
    definition?: any;
    dependencyOf?: string[];
    dependsOn?: string[];
    domain?: string;
    lifecycle?: string;
    memberOf?: string[];
    members?: string[];
    owner?: string;
    parameters?: string;
    parent?: string;
    presence?: string;
    profile?: Profile;
    providesApis?: string[];

    // doubt
    steps?: string;
    subcomponentOf?: string;
    system?: string;
    target?: string;
    targets?: string[];
    type?: string;
};

export type Metadata = {
    annotations?: { [key: string]: string; };
    description?: string;
    labels?: { [key: string]: string; };
    links?: Link[];
    name: string;
    namespace?: string;
    tags?: string[];
    title?: string;
    uid?: string;
};

export type KindType = typeof Kind[keyof typeof Kind];
export type YAMLData = {
    apiVersion: string;
    id?: string;
    kind: KindType;
    metadata: Metadata;
    spec: Spec;
};
