import Icon from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import React from 'react';

import { Validator } from '../../../utils/Validators';
import { Link } from '../../graph/types';
import { icons } from '../constants';

interface IProps {
  link?: Link;
  onFinish: (values: any) => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

function AddLinkDialog(props: IProps) {
    const { onFinish, link = {} } = props;
    const getIconOptions = () => {
        const options = [];

        for (const key in icons) {
            if (icons.hasOwnProperty(key)) {
                const value = icons[key];

                options.push(
            {
                'value': key,
                'label': <Icon
                    component = { value }
                    style = {{ fontSize: '25px',
                        color: '#faad14' }} />
            });
            }
        }

        return options;
    };

    return (
        <Form
            id = 'add-link'
            initialValues = { link }
            onFinish = { onFinish }
            { ...layout }>

            <Form.Item
                label = 'Link'
                name = { 'url' }
                rules = { [ { required: true,
                    message: 'Please enter URL' }, { validator: Validator.URL } ] }>
                <Input />
            </Form.Item>
            <Form.Item
                label = 'Title'
                name = { 'title' }>
                <Input />
            </Form.Item>
            <Form.Item
                label = 'Icon'
                name = { 'icon' }>
                <Select
                    options = { getIconOptions() }
                    style = {{ width: '70px' }} />
            </Form.Item>
            <Form.Item
                label = 'Type'
                name = { 'type' }>
                <Input />
            </Form.Item>
        </Form>
    );
}

export default AddLinkDialog;
