import { AutoComplete, Form, Select } from 'antd';
import { Kind } from 'utils/contants';
import { KindType, Spec } from 'views/graph/types';

interface IProps {
  id?: any;
  kind: KindType;
  onChange?: (values: Spec) => void;
  value?: Spec;
}

// const specsInfo = {
//     [Kind.Component]: {
//         [REQUIRED]: [ 'type', 'lifecycle', 'owner' ],
//         [OPTIONAL]: [ 'system', 'subcomponentOf', 'providesApis', 'consumesApis', 'dependsOn' ]
//     },
//     [Kind.API]: {
//         [REQUIRED]: [ 'type', 'lifecycle', 'owner' ],
//         [OPTIONAL]: [ 'system', 'definition' ]
//     },
//     [Kind.Group]: {
//         [REQUIRED]: [ 'type', 'children' ],
//         [OPTIONAL]: [ 'members', 'parent', 'profile' ]
//     },
//     [Kind.User]: {
//         [REQUIRED]: [ 'memberOf' ],
//         [OPTIONAL]: [ 'profile' ]
//     },
//     [Kind.Resource]: {
//         [REQUIRED]: [ 'owner', 'type' ],
//         [OPTIONAL]: [ 'system', 'dependsOn', 'dependencyOf' ]
//     },
//     [Kind.System]: {
//         [REQUIRED]: [ 'owner' ],
//         [OPTIONAL]: [ 'domain' ]
//     },
//     [Kind.Domain]: {
//         [REQUIRED]: [ 'owner' ],
//         [OPTIONAL]: []
//     },
//     [Kind.Location]: {
//         [REQUIRED]: [],
//         [OPTIONAL]: [ 'type', 'target', 'targets', 'presence' ]
//     },
//     [Kind.Template]: {
//         [REQUIRED]: [ 'type', 'parameters', 'steps' ],
//         [OPTIONAL]: [ 'owner' ]
//     }
// };

function SpecsForm(props: IProps) {
    const { id } = props;

    return (
        <Form id = { id }>
            <Form.Item
                label = 'Type'
                name = { 'type' }>
                <AutoComplete options = { [ { value: 'service' }, { value: 'website' }, { value: 'library' } ] } />
            </Form.Item>
            <Form.Item
                label = 'Lifecycle'
                name = { 'lifecycle' }>
                <AutoComplete options = { [ { value: 'experimental' }, { value: 'production' }, { value: 'deprecated' } ] } />
            </Form.Item>
            <Form.Item
                label = 'Owner'
                name = { 'owner' }>
                <Select />
            </Form.Item>
            <Form.Item
                label = 'System'
                name = { 'system' }>
                <Select />
            </Form.Item>
            <Form.Item
                label = 'Sub Component Of'
                name = { 'subcomponentOf' }>
                <Select />
            </Form.Item>
            <Form.Item
                label = 'Provides Apis'
                name = { 'providesApis' }>
                <Select />
            </Form.Item>
            <Form.Item
                label = 'Consumes Apis'
                name = { 'consumesApis' }>
                <Select />
            </Form.Item>
            <Form.Item
                label = 'Depends On'
                name = { 'dependsOn' }>
                <Select />
            </Form.Item>
            <Form.Item
                label = 'Definition'
                name = { 'definition' }>
                <Select />
            </Form.Item>
        </Form>
    );
}

export default SpecsForm;
