import { Button, Card, Collapse, CollapseProps, Drawer, Form, Input } from 'antd'
import React, { useCallback, useState } from 'react'
import { YAMLData } from '../graph/types'
import { useSelector } from 'react-redux';
import { IReduxState } from '../../redux/store';
import { CaretRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { cancelEditEntity, updateEntity } from '../../redux/reducers/catalog';
import MetadataForm from './components/MetadataForm';
import SpecsForm from './components/SpecsForm';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
function EditNodeDialog() {

  const { editEntity, edit } = useSelector((state:IReduxState)=> state.catalog);
  const [open, setOpen] = useState(true);
  const yamlData = editEntity?.data as YAMLData;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onClose = useCallback(()=> {
    setOpen(false);
    setTimeout(()=>dispatch(cancelEditEntity()),400);
  },[])

  const onSave = useCallback((values: any)=> {
    const newData:YAMLData = {
      id:yamlData.id,
      apiVersion: yamlData.apiVersion,
      kind: yamlData.kind,
      metadata: {
        name: values?.name,
        namespace: values?.namespace,
        title: values?.title,
        description: values?.description,
        labels: values?.labels,
        annotations: values?.annotations,
        tags: values?.tags,
        links: values?.links
      },
      spec: {
      }
    }
    if(editEntity){
      const newEntity = {...editEntity}
      newEntity.data= newData;
      dispatch(updateEntity(newEntity));
    }
  },[])

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Metadata',
      children: <MetadataForm/>,
    },
    {
        key: '2',
        label: 'Spec',
        children: <SpecsForm kind={yamlData.kind}/>,
    }
    ]
  return (
    <Drawer title={`Edit ${yamlData?.kind}`} placement="right" onClose={onClose} open={edit&&open}>
        <Form
            onValuesChange={(changedValues, allValues)=> onSave(allValues)}
            initialValues={{
                apiVersion: yamlData?.apiVersion,
                name: yamlData?.metadata?.name,
                title: yamlData?.metadata?.title,
                namespace: yamlData?.metadata?.namespace,
                description: yamlData?.metadata?.description,
                labels: yamlData?.metadata?.labels,
                annotations: yamlData?.metadata?.annotations,
                tags: yamlData?.metadata?.tags,
                links: yamlData?.metadata?.links
            }}
            {...layout}
            style={{display:'flex',flexDirection:'column',height:'100%'}}>
            <div style={{flex:1,overflowY:'auto'}}>
                <Form.Item name={'apiVersion'} label='API Version'>
                    <Input/>
                </Form.Item>
                <Collapse
                style={{borderRadius:'0px', borderRight:'none'}}
                // bordered={false}
                items={items}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                defaultActiveKey={['1']} />
            </div>
        </Form>
    </Drawer>
  )
}

export default EditNodeDialog