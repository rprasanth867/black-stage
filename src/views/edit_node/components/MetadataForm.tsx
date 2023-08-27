import { Form, Input, Space } from 'antd'
import KeyValueInput from './KeyValueInput'
import CustomSelector from './CustomSelector'
import Links from './Links'
import { metaDataRules } from 'utils/rules'

function MetadataForm() {
  return (
    <>
        <Form.Item name='namespace' label='Name Space' rules={metaDataRules.namespace}>
            <Input/>
        </Form.Item>
        <Form.Item name={'name'} label='Name' rules={metaDataRules.name}>
            <Input/>
        </Form.Item>
        <Form.Item name={'title'} label='Title' rules={metaDataRules.title}>
            <Input/>
        </Form.Item>
        <Form.Item name={'description'} label='Description' rules={metaDataRules.description}>
            <Input.TextArea/>
        </Form.Item>
        <span>Labels:</span>
        <Form.Item name={'labels'} rules={metaDataRules.labels} noStyle>
            <KeyValueInput/>
        </Form.Item>
        <br/>
        <span>Annotations:</span>
        <Form.Item name={'annotations'} rules={metaDataRules.annotations} noStyle>
            <KeyValueInput/>
        </Form.Item>
        <br/>
        <Form.Item name={'tags'} label='Tags' rules={metaDataRules.tags}>
            <CustomSelector/>
        </Form.Item>
        <br/>
        <Form.Item name={'links'} rules={metaDataRules.links} noStyle>
            <Links/>
        </Form.Item>
    </>
    
  )
}

export default MetadataForm