import { Card, Collapse, CollapseProps, Divider, Form, Input, Typography } from 'antd'
import React from 'react'
import { YAMLData } from '../graph/types'
interface IProps {
    id: string;
    data: YAMLData;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
function EditNodeDialog(props: IProps) {
  const {id, data} = props;

  const MetaDataForm = () => {
    return(
        <Card title='Metadata' style={{maxHeight:'300px'}}>
            <Form.Item name='namespace' label='Name Space'>
                <Input/>
            </Form.Item>
            <Form.Item name={'name'} label='Name'>
                <Input/>
            </Form.Item>
            <Form.Item name={'title'} label='Title'>
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
        </Card>
    )
  }
  return (
    <Form
        id={id}
        initialValues={{
            apiVersion: data.apiVersion,
            name: data.metadata.name,
            title: data.metadata.title,
        }}
        {...layout}>
        <Form.Item name={'apiVersion'} label='API Version'>
            <Input/>
        </Form.Item>
        <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
            <MetaDataForm/>
            <MetaDataForm/>
        </div>
    </Form>
  )
}

export default EditNodeDialog