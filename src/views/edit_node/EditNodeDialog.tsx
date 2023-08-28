import Icon, { CaretRightOutlined } from '@ant-design/icons';
import { App, Button, Collapse, CollapseProps, Drawer, Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import YamlCodeEditor from 'views/code_editor/YamlCodeEditor';

import { cancelEditEntity, deleteEntity, updateEntity } from '../../redux/reducers/catalog';
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
    const { modal } = App.useApp();
    const yamlData = editEntity?.data as YAMLData;
    const dispatch = useDispatch();

    const onClose = useCallback(() => {
        setOpen(false);
        setTimeout(() => dispatch(cancelEditEntity()), 400);
    }, []);


    const onSave = useCallback((values: any) => {
        const newData: YAMLData = {
            id: yamlData.id,
            path: `${values.path}.yaml`,
            apiVersion: yamlData.apiVersion,
            kind: yamlData.kind,
            metadata: values.metadata,
            spec: values.spec
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
                <SpecsForm
                    entityID = { yamlData.id }
                    kind = { yamlData.kind } />
            </Form.Item>)
        }
    ];

    const deleteNode = () => {
        dispatch(deleteEntity(yamlData.id));
    };

    const openCodeEditor = () => {
        modal.confirm({
            icon: <Icon component = { FaCode } />,
            title: 'Editor',
            width: '80%',
            style: { height: '50vh' },
            content: <YamlCodeEditor yamlData = { yamlData } />
        });
    };

    return (
        <Drawer
            onClose = { onClose }
            open = { edit && open }
            placement = 'right'
            title = { `Edit ${yamlData?.kind}` }>
            <Form
                initialValues = {{ ...yamlData,
                    path: yamlData.path.replace('.yaml', '') }}
                onFinish = { onSave }
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
                    <Form.Item
                        label = 'Path'
                        name = { 'path' }
                        style = {{ margin: '12px' }}>
                        <Input addonAfter = { '.yaml' } />
                    </Form.Item>
                    <Collapse
                        defaultActiveKey = { [ '1', '2' ] }
                        expandIcon = { ({ isActive }) => <CaretRightOutlined rotate = { isActive ? 90 : 0 } /> }
                        items = { items }
                        style = {{ borderRadius: '0px',
                            borderRight: 'none' }} />
                </div>
                <div
                    style = {{ display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        padding: '15px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTop: '2px #F1F1F1 solid' }}>
                    <Button onClick = { openCodeEditor }>Code</Button>
                    <Button onClick = { deleteNode }>Delete</Button>
                    <Button
                        htmlType = 'submit'
                        type = 'primary'>Save</Button>
                </div>
            </Form>
        </Drawer>
    );
}

export default EditNodeDialog;
