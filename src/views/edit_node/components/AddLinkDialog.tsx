import { Form, Input, Select } from 'antd'
import React from 'react'
import Icon from '@ant-design/icons'
import { icons } from './constants';
import { Validator } from '../../../utils/Validators';
import { Link } from '../../graph/types';

interface IProps {
  onFinish: (values: any) => void;
  link?: Link
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function AddLinkDialog(props: IProps) {
  const {onFinish,link={}} = props;
  const getIconOptions = ()=> {
    let options=[];
    for (const key in icons) {
        if (icons.hasOwnProperty(key)) {
          const value = icons[key];
          options.push(
            {
              'value': key,
              'label': <Icon style={{fontSize:'25px',color:'#faad14'}} component={value}/>
            })
        }
    }
    return options;
  }

  return (
    <Form id='add-link' initialValues={link} onFinish={onFinish} {...layout}>
        
        <Form.Item name={'url'} label='Link' rules={[{ required: true, message: 'Please enter URL' },{validator: Validator.URL}]}>
            <Input/>
        </Form.Item>
        <Form.Item name={'title'} label='Title'>
            <Input/>
        </Form.Item>
        <Form.Item name={'icon'} label='Icon'>
        <Select
            style={{width: '70px'}}
            options={getIconOptions()}
            />
        </Form.Item>
        <Form.Item name={'type'} label='Type'>
            <Input/>
        </Form.Item>
    </Form>
  )
}

export default AddLinkDialog;