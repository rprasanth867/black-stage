import { Form, Input, Space } from 'antd';
import { metaDataRules } from 'utils/rules';

import CustomSelector from './CustomSelector';
import KeyValueInput from './KeyValueInput';
import Links from './Links';


function MetadataForm() {
    return (
        <>
            <Form.Item
                label = 'Name Space'
                name = 'namespace'
                rules = { metaDataRules.namespace }>
                <Input />
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
        </>

    );
}

export default MetadataForm;
