import { Form, Input, Space } from 'antd'
import KeyValueInput from './KeyValueInput'

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
    </>
    
  )
}

export default MetadataForm