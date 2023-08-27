import { AutoComplete, Form, Select } from 'antd';
import { getSupportedSpecs } from 'utils/rules';
import { KindType, Spec } from 'views/graph/types';

interface IProps {
  id?: any;
  kind: KindType;
  onChange?: (values: Spec) => void;
  value?: Spec;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 }
};

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

const knownLifeCycles = [ { value: 'experimental' }, { value: 'production' }, { value: 'deprecated' } ];
const knownTypes = [ { value: 'service' }, { value: 'website' }, { value: 'library' } ];

function SpecsForm(props: IProps) {
    const { id, kind, value = {} } = props;

    const supportedSpecs = getSupportedSpecs(kind);
    const isVisible = (name: string) => supportedSpecs?.includes(name);


    return (
        <Form
            id = { id }
            initialValues = {{ ...value }}
            { ...layout }>
            {isVisible('type') && <Form.Item
                label = 'Type'
                name = { 'type' }>
                <AutoComplete options = { knownTypes } />
            </Form.Item>}
            {isVisible('lifecycle') && <Form.Item
                label = 'Lifecycle'
                name = { 'lifecycle' }>
                <AutoComplete options = { knownLifeCycles } />
            </Form.Item>}
            {isVisible('owner') && <Form.Item
                label = 'Owner'
                name = { 'owner' }>
                <Select />
            </Form.Item>}
            {isVisible('System') && <Form.Item
                label = 'System'
                name = { 'system' }>
                <Select />
            </Form.Item>}
            {isVisible('subcomponentOf') && <Form.Item
                label = 'Sub Component Of'
                name = { 'subcomponentOf' }>
                <Select />
            </Form.Item>}
            {isVisible('providesApis') && <Form.Item
                label = 'Provides Apis'
                name = { 'providesApis' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {isVisible('consumesApis') && <Form.Item
                label = 'Consumes Apis'
                name = { 'consumesApis' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {isVisible('dependsOn') && <Form.Item
                label = 'Depends On'
                name = { 'dependsOn' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {/* {isVisible('definition') && <Form.Item
                label = 'Definition'
                name = { 'definition' }>
                <Input.TextArea />
            </Form.Item>} */}
            {isVisible('parent') && <Form.Item
                label = 'Parent'
                name = { 'parent' }>
                <Select />
            </Form.Item>}
            {isVisible('children') && <Form.Item
                label = 'Children'
                name = { 'children' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {isVisible('members') && <Form.Item
                label = 'Members'
                name = { 'members' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {isVisible('memberOf') && <Form.Item
                label = 'Member Of'
                name = { 'memberOf' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {isVisible('dependencyOf') && <Form.Item
                label = 'Dependency Of'
                name = { 'dependencyOf' }>
                <Select mode = 'multiple' />
            </Form.Item>}
            {isVisible('domain') && <Form.Item
                label = 'Domain'
                name = { 'domain' }>
                <Select mode = 'multiple' />
            </Form.Item>}
        </Form>
    );
}

export default SpecsForm;
