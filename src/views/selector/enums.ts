export enum Kind {
    Component = 'Component',
    Template = 'Template',
    API = 'API',
    Group = 'Group',
    User = 'User',
    Resource = 'Resource',
    System = 'System',
    Domain = 'Domain',
    Location = 'Location' 
}

export enum Relation {
    memberOf='memberOf',
    hasMember='hasMember',
    ownerOf='ownerOf',
    ownedBy='ownedBy',
    partOf='partOf',
    hasPart='hasPart',
    dependsOn='dependsOn',
    dependencyOf='dependencyOf',
    providesAPI='providesAPI',
    consumesAPI='consumesAPI',
    parentOf='parentOf',
    childOf='childOf'
}
