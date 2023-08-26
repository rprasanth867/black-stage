import { Form, Input, Space } from 'antd'
import KeyValueInput from './KeyValueInput'
import CustomSelector from './CustomSelector'
import Links from './Links'

function MetadataForm() {
  return (
    <>
        <Form.Item name='namespace' label='Name Space'>
            <Input/>
        </Form.Item>
        <Form.Item name={'name'} label='Name'>
            <Input/>
        </Form.Item>
        <Form.Item name={'title'} label='Title'>
            <Input/>
        </Form.Item>
        <Form.Item name={'description'} label='Description'>
            <Input.TextArea/>
        </Form.Item>
        <span>Labels:</span>
        <Form.Item name={'labels'} noStyle>
            <KeyValueInput/>
        </Form.Item>
        <br/>
        <span>Annotations:</span>
        <Form.Item name={'annotations'} noStyle>
            <KeyValueInput/>
        </Form.Item>
        <br/>
        <Form.Item name={'tags'} label='Tags'>
            <CustomSelector/>
        </Form.Item>
        <br/>
        <Form.Item name={'links'} noStyle>
            <Links/>
        </Form.Item>
    </>
    
  )
}

export default MetadataForm