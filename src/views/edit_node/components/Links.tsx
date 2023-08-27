import Icon from '@ant-design/icons';
import { App, Button, Popover } from 'antd';
import React from 'react';
import { FaEdit, FaLink } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { Link } from '../../graph/types';
import { icons } from '../constants';

import AddLinkDialog from './AddLinkDialog';

let closeEditDialog: any;

interface IProps {
    id?: string;
    onChange?: (value: Link[]) => void;
    value?: Link[];
}
function Links(props: IProps) {
    const { id, onChange, value = [] } = props;
    const { modal } = App.useApp();

    const onAdd = (item: Link) => {
        if (onChange) {
            onChange([ ...value, item ]);
        }
        if (closeEditDialog) {
            closeEditDialog();
        }
    };

    const onUpdate = (item: Link, index?: number) => {
        const items = [ ...value ];

        if (index !== undefined) {
            items[index] = item;
        }
        if (onChange) {
            onChange(items);
        }
        if (closeEditDialog) {
            closeEditDialog();
        }
    };

    const onDelete = (index: number) => {
        const items = [ ...value ];

        items.splice(index, 1);
        if (onChange) {
            onChange(items);
        }
    };

    const editLink = (newItem: boolean, item?: Link, index?: number) => {
        const { destroy } = modal.confirm({
            icon: <Icon component = { FaLink } />,
            title: 'Add Link',
            content: (<AddLinkDialog
                link = { item }
                // eslint-disable-next-line no-extra-parens
                onFinish = { values => (newItem ? onAdd(values) : onUpdate(values, index)) } />),
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onOk: () => new Promise(() => {}),
            okButtonProps: {
                htmlType: 'submit',
                form: 'add-link'
            }
        });

        closeEditDialog = destroy;
    };

    const LinkControl = (data: { index: number; link: Link; }) => (
        <div
            style = {{ display: 'flex',
                flexDirection: 'column',
                gap: '4px' }}>
            <Button
                icon = { <FaEdit /> }
                onClick = { () => editLink(false, data.link, data.index) }
                type = 'link'>Edit</Button>
            <Button
                icon = { <MdDelete /> }
                onClick = { () => onDelete(data.index) }
                style = {{ color: 'rgb(237, 45, 45)' }}
                type = 'link'>Delete</Button>
        </div>
    );

    return (
        <div
            id = { id }
            style = {{ display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                width: '100%' }}>
            <div
                style = {{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center' }}>
                <span>Links: </span>
                <Button
                    onClick = { () => editLink(true) }
                    style = {{ borderColor: '007bff',
                        color: '#007bff' }}>
                    Add Link
                </Button>
            </div>
            <div
                style = {{ display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px' }}>
                {value?.map((val, index) =>
                    (<Popover
                        content = { <LinkControl
                            index = { index }
                            link = { val } /> }
                        key = { index }>
                        <div
                            style = {{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                maxWidth: '180px',
                                overflow: 'hidden',
                                border: '1.5px #F2F2F2 solid',
                                width: 'fit-content',
                                borderRadius: '8px',
                                padding: '4px'
                            }}>
                            {val.icon && <Icon
                                component = { icons[val.icon] }
                                style = {{ fontSize: '25px',
                                    color: '#faad14' }} />}
                            <div
                                style = {{ whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis' }}> {val.title || val.url}</div>
                        </div>
                    </Popover>))}

            </div>

        </div>
    );
}

export default Links;
