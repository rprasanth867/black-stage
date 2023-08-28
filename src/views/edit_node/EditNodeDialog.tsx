import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps, Drawer, Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cancelEditEntity, updateEntity } from '../../redux/reducers/catalog';
import { IReduxState } from '../../redux/store';
import { YAMLData } from '../graph/types';

import MetadataForm from './components/MetadataForm';
import SpecsForm from './components/SpecsForm';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

function EditNodeDialog() {

    const { editEntity, edit } = useSelector((state: IReduxState) => state.catalog);
    const [ open, setOpen ] = useState(true);
    const yamlData = editEntity?.data as YAMLData;
    const dispatch = useDispatch();

    const onClose = useCallback(() => {
        setOpen(false);
        setTimeout(() => dispatch(cancelEditEntity()), 400);
    }, []);


    const onSave = useCallback((values: any) => {
        console.log('VRRRR', values);
        const newData: YAMLData = {
            id: yamlData.id,
            apiVersion: yamlData.apiVersion,
            kind: yamlData.kind,
            metadata: values.metadata,
            spec: { }
        };

        if (editEntity) {
            const newEntity = { ...editEntity };

            newEntity.data = newData;
            dispatch(updateEntity(newEntity));
        }
    }, []);

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Metadata',
            children: (<Form.Item
                name = { 'metadata' }
                noStyle = { true }>
                <MetadataForm />
            </Form.Item>)
        },
        {
            key: '2',
            label: 'Spec',
            children: (<Form.Item
                name = { 'spec' }
                noStyle = { true }>
                <SpecsForm kind = { yamlData.kind } />
            </Form.Item>)
        }
    ];

    return (
        <Drawer
            onClose = { onClose }
            open = { edit && open }
            placement = 'right'
            title = { <p>{`Edit ${yamlData?.kind}`}</p> }>
            <Form
                initialValues = {{
                    apiVersion: yamlData?.apiVersion,
                    metadata: yamlData.metadata,
                    spec: yamlData.spec
                }}
                onValuesChange = { (changedValues, allValues) => onSave(allValues) }
                { ...layout }
                style = {{ display: 'flex',
                    flexDirection: 'column',
                    height: '100%' }}>
                <div
                    style = {{ flex: 1,
                        overflowY: 'auto' }}>
                    <Form.Item
                        label = 'API Version'
                        name = { 'apiVersion' }
                        style = {{ margin: '12px' }}>
                        <Input />
                    </Form.Item>
                    <Collapse
                        defaultActiveKey = { [ '1', '2' ] }
                        expandIcon = { ({ isActive }) => <CaretRightOutlined rotate = { isActive ? 90 : 0 } /> }
                        items = { items }
                        style = {{ borderRadius: '0px',
                            borderRight: 'none' }} />
                </div>
            </Form>
        </Drawer>
    );
}

export default EditNodeDialog;
