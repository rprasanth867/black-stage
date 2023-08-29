import { AutoComplete, Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/store';
import {
    getAllAPIs,
    getAllComponents,
    getAllDomains,
    getAllGroups,
    getAllOwners,
    getAllPossibleDependencies,
    getAllSystems,
    getAllUsers
} from 'utils/graph_util';
import { getSupportedSpecs } from 'utils/rules';
import { KindType, Spec } from 'views/graph/types';

import ProfileForm from './ProfileForm';

interface IProps {
  entityID: string;
  id?: any;
  kind: KindType;
  onChange?: (values: Spec) => void;
  value?: Spec;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 20 }
};

const knownLifeCycles = [ { value: 'experimental' }, { value: 'production' }, { value: 'deprecated' } ];
const knownTypes = [ { value: 'service' }, { value: 'website' }, { value: 'library' } ];

function SpecsForm(props: IProps) {
    const { id, kind, value = {}, onChange, entityID } = props;

    const handleValuesChanges = (changed: any, values: any) => {
        if (onChange) {
            onChange(values);
        }
    };

    const supportedSpecs = getSupportedSpecs(kind);
    const isVisible = (name: string) => supportedSpecs?.includes(name);

    const allOwners = useSelector(getAllOwners);
    const allSystems = useSelector(getAllSystems);
    const allComponents = useSelector((state: IReduxState) => getAllComponents(state, entityID));
    const allPossibleDependencies = useSelector((state: IReduxState) => getAllPossibleDependencies(state, entityID));
    const allGroups = useSelector((state: IReduxState) => getAllGroups(state, entityID));
    const allUsers = useSelector(getAllUsers);
    const allDomains = useSelector(getAllDomains);
    const allAPis = useSelector(getAllAPIs);

    return (
        <Form
            id = { id }
            initialValues = {{ ...value }}
            onValuesChange = { handleValuesChanges }
            { ...layout }>
            {isVisible('profile') && <div style = {{ marginBottom: '10px' }}>
                <span>Profile:</span>
                <Form.Item
                    name = { 'profile' }
                    noStyle = { true }>
                    <ProfileForm />
                </Form.Item></div>}
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
                <Select options = { allOwners } />
            </Form.Item>}
            {isVisible('system') && <Form.Item
                label = 'System'
                name = { 'system' }>
                <Select options = { allSystems } />
            </Form.Item>}
            {isVisible('subcomponentOf') && <Form.Item
                label = 'Sub Component Of'
                name = { 'subcomponentOf' }>
                <Select options = { allComponents } />
            </Form.Item>}
            {isVisible('providesApis') && <Form.Item
                label = 'Provides Apis'
                name = { 'providesApis' }>
                <Select
                    mode = 'multiple'
                    options = { allAPis } />
            </Form.Item>}
            {isVisible('consumesApis') && <Form.Item
                label = 'Consumes Apis'
                name = { 'consumesApis' }>
                <Select
                    mode = 'multiple'
                    options = { allAPis } />
            </Form.Item>}
            {isVisible('dependsOn') && <Form.Item
                label = 'Depends On'
                name = { 'dependsOn' }>
                <Select
                    mode = 'multiple'
                    options = { allPossibleDependencies } />
            </Form.Item>}
            {/* {isVisible('definition') && <Form.Item
                label = 'Definition'
                name = { 'definition' }>
                <Input.TextArea />
            </Form.Item>} */}
            {isVisible('parent') && <Form.Item
                label = 'Parent'
                name = { 'parent' }>
                <Select options = { allGroups } />
            </Form.Item>}
            {isVisible('children') && <Form.Item
                label = 'Children'
                name = { 'children' }>
                <Select
                    mode = 'multiple'
                    options = { allGroups } />
            </Form.Item>}
            {isVisible('members') && <Form.Item
                label = 'Members'
                name = { 'members' }>
                <Select
                    mode = 'multiple'
                    options = { allUsers } />
            </Form.Item>}
            {isVisible('memberOf') && <Form.Item
                label = 'Member Of'
                name = { 'memberOf' }>
                <Select
                    mode = 'multiple'
                    options = { allGroups } />
            </Form.Item>}
            {isVisible('dependencyOf') && <Form.Item
                label = 'Dependency Of'
                name = { 'dependencyOf' }>
                <Select
                    mode = 'multiple'
                    options = { allPossibleDependencies } />
            </Form.Item>}
            {isVisible('domain') && <Form.Item
                label = 'Domain'
                name = { 'domain' }>
                <Select options = { allDomains } />
            </Form.Item>}
        </Form>
    );
}

export default SpecsForm;
