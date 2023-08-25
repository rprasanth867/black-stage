import { Button, Card, Collapse, CollapseProps, Drawer, Form, Input } from 'antd'
import React, { useCallback } from 'react'
import { YAMLData } from '../graph/types'
import { useSelector } from 'react-redux';
import { IReduxState } from '../../redux/store';
import { CaretRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { cancelEditEntity } from '../../redux/reducers/catalog';
import MetadataForm from './components/MetadataForm';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
function EditNodeDialog() {

  const { editEntity, edit } = useSelector((state:IReduxState)=> state.catalog);
  const yamlData = editEntity?.data as YAMLData;
  const [form] = Form.useForm();
  console.log('VRRRR', yamlData);
  const dispatch = useDispatch();

  const onClose = useCallback(()=> {
    dispatch(cancelEditEntity());
  },[])

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Metadata',
      children: <MetadataForm/>,
    },
    {
        key: '2',
        label: 'Specs',
        children: <span>No content</span>,
    }
    ]
  return (
    <Drawer title={`Edit ${yamlData?.kind}`} placement="right" onClose={onClose} open={edit}>
        <Form
            onFinish={(values)=>console.log('VRRRR val',values)}
            initialValues={{
                apiVersion: yamlData?.apiVersion,
                name: yamlData?.metadata?.name,
                title: yamlData?.metadata?.title,
                labels: {
                    "key1" : "value1",
                    "key2" : "value2"
                  }
            }}
            {...layout}
            style={{display:'flex',flexDirection:'column',height:'100%'}}>
            <div style={{flex:1}}>
                <Form.Item name={'apiVersion'} label='API Version'>
                    <Input/>
                </Form.Item>
                <Collapse
                style={{marginLeft:'-10px'}}
                bordered={false}
                items={items}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                defaultActiveKey={['1']} />
            </div>
            <div style={{alignSelf:'flex-end',display:'flex',gap:'10px'}}>
                <Button size='large'>
                    Cancel
                </Button>
                <Button htmlType='submit' size='large' type='primary'>
                    Save
                </Button>
            </div>
            
        </Form>
    </Drawer>
  )
}

export default EditNodeDialog