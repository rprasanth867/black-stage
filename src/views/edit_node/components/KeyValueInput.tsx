import { Button, Form, Input, Table } from 'antd';
import Item from 'antd/es/list/Item';
import Column from 'antd/es/table/Column';
import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { MdDelete } from 'react-icons/md';
interface Item {
    id: number;
    value: string;
    xkey: string;
}

interface IProps {
  id?: string;
  onChange?: (value: { [key: string]: string; }) => void;
  value?: { [key: string]: string; };
}

const formatData = (values: { [key: string]: string; } | undefined): Item[] => {
    const data: Item[] = [];
    let idx = 0;

    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            const value = values[key];

            data.push(
        {
            'id': idx,
            'xkey': key,
            'value': value
        }
            );
            idx += 1;
        }
    }

    data.push({
        'id': idx,
        'xkey': '',
        'value': ''
    });

    return data;
};

const getOriginalFormat = (items: Item[]) => {
    const data: { [key: string]: string; } = {};

    items.forEach((item, index) => {
        if (index != items.length - 1) {
            data[item.xkey] = item.value;
        }
    });

    return data;
};

function KeyValueInput(props: IProps) {
    const [ data, setData ] = useState<Item[]>(formatData(props.value));

    const onChange = (e: any, index: number, key: 'xkey' | 'value', newVal: string) => {
        const items: Item[] = data;

        items[index][key] = newVal;
        if (index === data.length - 1) {
            items.push({
                'id': data[data.length - 1].id + 1,
                'xkey': '',
                'value': ''
            });
        }
        setData([ ...items ]);

        if (props.onChange) {
            props.onChange(getOriginalFormat(items));
        }

    };

    const onDelete = (index: number) => {
        const items: Item[] = data;

        items.splice(index, 1);
        setData([ ...items ]);
        if (props.onChange) {
            props.onChange(getOriginalFormat(items));
        }
    };

    return (
        <Table
            bordered = { true }
            dataSource = { data }
            key = { 'id' }
            pagination = { false }
            rowClassName = 'editable-row'
            scroll = {{ y: 240 }}>
            <Column
                dataIndex = { 'xkey' }
                key = { 'xkey' }
                render = { (text, record: Item, index) =>
                    (<Input
                        onChange = { e => onChange(e, index, 'xkey', e.target.value) }
                        value = { text } />)
                }
                title = 'Key' />
            <Column
                dataIndex = { 'value' }
                key = { 'value' }
                render = { (text, record: Item, index) =>
                    (<Input
                        onChange = { e => onChange(e, index, 'value', e.target.value) }
                        value = { text } />)
                }
                title = 'Value' />

            <Column
                render = { (text, record: Item, index) => {
                    const isDisabled = index === data.length - 1;

                    return (
                        <Button
                            disabled = { isDisabled }
                            icon = { <MdDelete /> }
                            onClick = { () => onDelete(index) }
                            style = {{ color: isDisabled ? 'grey' : '#ed2d2d',
                                fontSize: '20px' }}
                            type = 'text' />
                    );
                }
                }
                title = 'Action' />
        </Table>
    );
}

export default KeyValueInput;
