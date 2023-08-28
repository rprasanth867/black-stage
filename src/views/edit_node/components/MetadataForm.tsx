import { Form, Input } from 'antd';
import { metaDataRules } from 'utils/rules';
import { Metadata } from 'views/graph/types';

import CustomSelector from './CustomSelector';
import KeyValueInput from './KeyValueInput';
import Links from './Links';

interface IProps {
    id?: string;
    onChange?: (value: Metadata) => void;
    value?: Metadata;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

function MetadataForm(props: IProps) {
    const { id, value = {}, onChange } = props;

    const handleValuesChanges = (changed: any, values: any) => {
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <Form
            id = { id }
            initialValues = {{ ...value }}
            onValuesChange = { handleValuesChanges }
            { ...layout }>
            <Form.Item
                label = 'Name Space'
                name = 'namespace'
                rules = { metaDataRules.namespace }>
                <Input placeholder = 'default' />
            </Form.Item>
            <Form.Item
                label = 'Name'
                name = { 'name' }
                rules = { metaDataRules.name }>
                <Input />
            </Form.Item>
            <Form.Item
                label = 'Title'
                name = { 'title' }
                rules = { metaDataRules.title }>
                <Input />
            </Form.Item>
            <Form.Item
                label = 'Description'
                name = { 'description' }
                rules = { metaDataRules.description }>
                <Input.TextArea />
            </Form.Item>
            <span>Labels:</span>
            <Form.Item
                name = { 'labels' }
                noStyle = { true }
                rules = { metaDataRules.labels }>
                <KeyValueInput />
            </Form.Item>
            <br />
            <span>Annotations:</span>
            <Form.Item
                name = { 'annotations' }
                noStyle = { true }
                rules = { metaDataRules.annotations }>
                <KeyValueInput />
            </Form.Item>
            <br />
            <Form.Item
                label = 'Tags'
                name = { 'tags' }
                rules = { metaDataRules.tags }>
                <CustomSelector />
            </Form.Item>
            <br />
            <Form.Item
                name = { 'links' }
                noStyle = { true }
                rules = { metaDataRules.links }>
                <Links />
            </Form.Item>
        </Form>

    );
}

export default MetadataForm;
