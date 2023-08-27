import { YAMLData } from "views/graph/types"

interface Res {
    entity: YAMLData,
    id: string,
    path: string
}

export const fullData: Res[] = [
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "API Services Team",
                "name": "api-services"
            },
            "spec": {
                "children": [],
                "parent": "developer",
                "profile": {
                    "displayName": "API Services Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/api-services.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/api-services",
        "path": "org/nouveau-labs/api-services-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Call Center Chat Team",
                "name": "call-center-chat"
            },
            "spec": {
                "children": [],
                "parent": "developer",
                "profile": {
                    "displayName": "Call Center Chat Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/call-center-chat.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/call-center-chat",
        "path": "org/nouveau-labs/call-center-chat-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Call Center Team",
                "name": "call-center"
            },
            "spec": {
                "children": [],
                "parent": "developer",
                "profile": {
                    "displayName": "Call Center Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/call-center.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/call-center",
        "path": "org/nouveau-labs/call-center-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "The developer sub-department",
                "name": "developer"
            },
            "spec": {
                "children": [
                    "call-center",
                    "api-services"
                ],
                "parent": "manager",
                "profile": {
                    "displayName": "Developers",
                    "picture": "https://avatars.dicebear.com/api/identicon/developer.svg?background=%23fff&margin=25"
                },
                "type": "sub-department"
            }
        },
        "id": "default/developer",
        "path": "org/nouveau-labs/developer-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "The devops sub-department",
                "name": "devops"
            },
            "spec": {
                "children": [
                    "sysadmin",
                    "sysadmin-telephony"
                ],
                "parent": "manager",
                "profile": {
                    "displayName": "DevOps",
                    "picture": "https://avatars.dicebear.com/api/identicon/devops.svg?background=%23fff&margin=25"
                },
                "type": "sub-department"
            }
        },
        "id": "default/devops",
        "path": "org/nouveau-labs/devops-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Jitsi Backend Team",
                "name": "jitsi-backend"
            },
            "spec": {
                "children": [],
                "parent": "developer",
                "profile": {
                    "displayName": "Jitsi Backend Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/jitsi-backend.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/jitsi-backend",
        "path": "org/nouveau-labs/jitsi-backend-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Jitsi Web Team",
                "name": "jitsi-web"
            },
            "spec": {
                "children": [],
                "parent": "developer",
                "profile": {
                    "displayName": "Jitsi Web Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/jitsi-web.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/jitsi-web",
        "path": "org/nouveau-labs/jitsi-web-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "The Manager's department",
                "name": "manager"
            },
            "spec": {
                "children": [
                    "developer",
                    "devops"
                ],
                "parent": "nouveau-labs",
                "profile": {
                    "displayName": "Manager",
                    "picture": "https://avatars.dicebear.com/api/identicon/manager.svg?background=%23fff&margin=25"
                },
                "type": "department"
            }
        },
        "id": "default/manager",
        "path": "org/nouveau-labs/manager-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Mobile Team",
                "name": "mobile"
            },
            "spec": {
                "children": [],
                "parent": "developer",
                "profile": {
                    "displayName": "Mobile Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/mobile.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/mobile",
        "path": "org/nouveau-labs/mobile-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "The Nouveau Labs organization",
                "links": [
                    {
                        "title": "Official Website",
                        "url": "https://www.nouveau-labs.com"
                    },
                    {
                        "title": "LinkedIn",
                        "url": "https://in.linkedin.com/company/nouveaulabs"
                    }
                ],
                "name": "nouveau-labs"
            },
            "spec": {
                "children": [
                    "manager"
                ],
                "profile": {
                    "displayName": "Nouveau Labs Pvt Ltd.",
                    "email": "info@nouveau-labs.com",
                    "picture": "https://meet.dolphinvc.com/favicon.ico"
                },
                "type": "organization"
            }
        },
        "id": "default/nouveau-labs",
        "path": "org/nouveau-labs/org.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Sysadmin Team",
                "name": "sysadmin"
            },
            "spec": {
                "children": [],
                "parent": "devops",
                "profile": {
                    "displayName": "Sysadmin Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/sysadmin.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/sysadmin",
        "path": "org/nouveau-labs/sysadmin-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Group",
            "metadata": {
                "description": "Sysadmin Telephony Team",
                "name": "sysadmin-telephony"
            },
            "spec": {
                "children": [],
                "parent": "devops",
                "profile": {
                    "displayName": "Sysadmin Telephony Team",
                    "picture": "https://avatars.dicebear.com/api/identicon/sysadmin-telephony.svg?background=%23fff&margin=25"
                },
                "type": "team"
            }
        },
        "id": "default/sysadmin-telephony",
        "path": "org/nouveau-labs/sysadmin-telephony-group.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "User",
            "metadata": {
                "name": "stummala"
            },
            "spec": {
                "memberOf": [
                    "nouveau-labs"
                ],
                "profile": {
                    "displayName": "Satya Tummalapenta",
                    "email": "stummala@nouveau-labs.com",
                    "picture": "https://avatars.dicebear.com/api/avataaars/stummala@nouveau-labs.com.svg?background=%23fff"
                }
            }
        },
        "id": "default/stummala",
        "path": "org/nouveau-labs/user.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Location",
            "metadata": {
                "description": "A collection of all Backstage example APIs",
                "name": "example-apis"
            },
            "spec": {
                "targets": [
                    "./apis/dvc-flow-manager/flows-api.yaml"
                ]
            }
        },
        "id": "default/example-apis",
        "path": "projects/dvc/all-apis.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Location",
            "metadata": {
                "description": "A collection of all Backstage example components",
                "name": "example-components"
            },
            "spec": {
                "targets": [
                    "./components/dvc-flow-dashboard-component.yaml",
                    "./components/dvc-flow-manager-component.yaml",
                    "./components/dvc-ivr-app-component.yaml",
                    "./components/go-common-component.yaml"
                ]
            }
        },
        "id": "default/example-components",
        "path": "projects/dvc/all-components.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Location",
            "metadata": {
                "description": "A collection of all Backstage example domains",
                "name": "example-domains"
            },
            "spec": {
                "targets": [
                    "./domains/dolphinvc-domain.yaml"
                ]
            }
        },
        "id": "default/example-domains",
        "path": "projects/dvc/all-domains.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Location",
            "metadata": {
                "description": "A collection of all Backstage example systems",
                "name": "example-systems"
            },
            "spec": {
                "targets": [
                    "./systems/call-center-core-system.yaml",
                    "./systems/call-center-realtime-dashboard-system.yaml"
                ]
            }
        },
        "id": "default/example-systems",
        "path": "projects/dvc/all-systems.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Location",
            "metadata": {
                "description": "A collection of all Backstage example entities, except users, groups, and templates",
                "name": "example-all"
            },
            "spec": {
                "targets": [
                    "./all-apis.yaml",
                    "./all-components.yaml",
                    "./all-domains.yaml",
                    "./all-systems.yaml"
                ]
            }
        },
        "id": "default/example-all",
        "path": "projects/dvc/all.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "API",
            "metadata": {
                "description": "The DVC Flow Manager Flows API",
                "links": [
                    {
                        "icon": "github",
                        "title": "Bitbucket Repository",
                        "url": "https://bitbucket.org/smartbot2017/dvc-flow-manager"
                    },
                    {
                        "icon": "code",
                        "title": "API Spec",
                        "url": "https://bitbucket.org/smartbot2017/dvc-flow-manager/src/develop/docs/swagger/flows.yaml"
                    }
                ],
                "name": "dvc-flow-manager-flows",
                "tags": [
                    "dvc-flow-manager",
                    "rest"
                ]
            },
            "spec": {
                "definition": {
                    "$text": "./openapi/flows.oas.yaml"
                },
                "lifecycle": "experimental",
                "owner": "call-center",
                "system": "call-center-realtime-dashboard",
                "type": "openapi"
            }
        },
        "id": "default/dvc-flow-manager-flows",
        "path": "projects/dvc/apis/dvc-flow-manager/flows-api.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Component",
            "metadata": {
                "annotations": {
                    "backstage.io/techdocs-ref": "dir:./dvc-flow-dashboard"
                },
                "description": "DVC Flow Dashboard",
                "links": [
                    {
                        "icon": "github",
                        "title": "Bitbucket Repository",
                        "url": "https://bitbucket.org/smartbot2017/dvc-flow-dashboard"
                    }
                ],
                "name": "dvc-flow-dashboard",
                "tags": [
                    "javascript",
                    "call-center",
                    "dashboard"
                ]
            },
            "spec": {
                "apiConsumedBy": [],
                "dependsOn": [],
                "lifecycle": "experimental",
                "owner": "user:default/asunil",
                "providesApis": [],
                "system": "call-center-realtime-dashboard",
                "type": "website"
            }
        },
        "id": "default/dvc-flow-dashboard",
        "path": "projects/dvc/components/dvc-flow-dashboard-component.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Component",
            "metadata": {
                "annotations": {
                    "backstage.io/techdocs-ref": "dir:./dvc-flow-manager"
                },
                "description": "DVC Flow Manager",
                "links": [
                    {
                        "icon": "github",
                        "title": "Bitbucket Repository",
                        "url": "https://bitbucket.org/smartbot2017/dvc-flow-manager"
                    }
                ],
                "name": "dvc-flow-manager",
                "tags": [
                    "golang",
                    "call-center"
                ]
            },
            "spec": {
                "apiConsumedBy": [],
                "dependsOn": [
                    "component:go-common"
                ],
                "lifecycle": "experimental",
                "owner": "user:auppuluri",
                "providesApis": [
                    "dvc-flow-manager-flows"
                ],
                "system": "call-center-core",
                "type": "service"
            }
        },
        "id": "default/dvc-flow-manager",
        "path": "projects/dvc/components/dvc-flow-manager-component.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Component",
            "metadata": {
                "annotations": {
                    "backstage.io/techdocs-ref": "dir:./dvc-ivr-app"
                },
                "description": "DVC IVR App",
                "links": [
                    {
                        "icon": "github",
                        "title": "Bitbucket Repository",
                        "url": "https://bitbucket.org/smartbot2017/dvc-ivr-app"
                    }
                ],
                "name": "dvc-ivr-app",
                "tags": [
                    "golang",
                    "call-center"
                ]
            },
            "spec": {
                "apiConsumedBy": [],
                "dependsOn": [
                    "component:go-common"
                ],
                "lifecycle": "experimental",
                "owner": "user:auppuluri",
                "providesApis": [],
                "system": "call-center-core",
                "type": "service"
            }
        },
        "id": "default/dvc-ivr-app",
        "path": "projects/dvc/components/dvc-ivr-app-component.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Component",
            "metadata": {
                "annotations": {
                    "backstage.io/techdocs-ref": "dir:./go-common"
                },
                "description": "Go Common",
                "links": [
                    {
                        "icon": "github",
                        "title": "Bitbucket Repository",
                        "url": "https://bitbucket.org/smartbot2017/go-common"
                    }
                ],
                "name": "go-common",
                "tags": [
                    "golang",
                    "call-center"
                ]
            },
            "spec": {
                "apiConsumedBy": [],
                "dependsOn": [],
                "lifecycle": "experimental",
                "owner": "user:auppuluri",
                "providesApis": [],
                "system": "call-center-core",
                "type": "library"
            }
        },
        "id": "default/go-common",
        "path": "projects/dvc/components/go-common-component.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "Domain",
            "metadata": {
                "description": "Everything related to DolphinVC",
                "links": [
                    {
                        "icon": "dashboard",
                        "title": "Official Website",
                        "url": "https://meet.dolphinvc.com"
                    }
                ],
                "name": "dolphinvc",
                "title": "DolphinVC"
            },
            "spec": {
                "owner": "user:sjanagonda"
            }
        },
        "id": "default/dolphinvc",
        "path": "projects/dvc/domains/dolphinvc-domain.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "System",
            "metadata": {
                "description": "Everything related to Call center Core",
                "name": "call-center-core",
                "tags": [
                    "core"
                ]
            },
            "spec": {
                "domain": "dolphinvc",
                "owner": "call-center"
            }
        },
        "id": "default/call-center-core",
        "path": "projects/dvc/systems/call-center-core-system.yaml"
    },
    {
        "entity": {
            "apiVersion": "backstage.io/v1alpha1",
            "kind": "System",
            "metadata": {
                "description": "Everything related to realtime dashboard",
                "name": "call-center-realtime-dashboard",
                "tags": [
                    "dashboard"
                ]
            },
            "spec": {
                "domain": "dolphinvc",
                "owner": "call-center"
            }
        },
        "id": "default/call-center-realtime-dashboard",
        "path": "projects/dvc/systems/call-center-realtime-dashboard-system.yaml"
    }
]