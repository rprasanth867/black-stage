import { Card, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKindFilter } from 'redux/reducers/catalog';
import { IReduxState } from 'redux/store';
import { Kind } from 'utils/contants';
import { getAllKinds } from 'utils/graph_util';

import { KindType, YAMLData } from '../graph/types';

import KindNode from './KindNode';

function ComponentSelector() {
    const getDefaultData = (kind: KindType): YAMLData => {
        return {
            apiVersion: 'default',
            id: 'default',
            path: 'none',
            kind,
            metadata: {
                name: kind
            }
        };
    };

    const allOptions = getAllKinds().map(tk => {
        return { value: tk };
    });
    const selectedKinds = useSelector((state: IReduxState) => state.catalog.kindFilter);
    const dispatch = useDispatch();

    return (
        <div
            style = {{ backgroundColor: '#f0f0f0',
                borderLeft: '1px solid #f0f0f0',
                width: '280px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px' }}>
            {/* <Card title='Root Entities' style={{borderRadius:'18px'}}>
          <div style={{display:'grid',gap:'10px',gridTemplateColumns:'auto auto'}}>
          <KindNode graph={false} data = {getDefaultData(Kind.Location)}/>
          <KindNode graph={false} data = {getDefaultData(Kind.Template)}/>
          </div>
        </Card> */}
            <Card
                style = {{ borderRadius: '18px' }}
                title = 'Core Entities'>
                <div
                    style = {{ display: 'grid',
                        gap: '10px',
                        gridTemplateColumns: 'auto auto' }}>
                    <KindNode
                        data = { getDefaultData(Kind.Domain) }
                        graph = { false } />
                    <KindNode
                        data = { getDefaultData(Kind.System) }
                        graph = { false } />
                    <KindNode
                        data = { getDefaultData(Kind.Component) }
                        graph = { false } />
                    <KindNode
                        data = { getDefaultData(Kind.Resource) }
                        graph = { false } />
                    <KindNode
                        data = { getDefaultData(Kind.API) }
                        graph = { false } />
                </div>
            </Card>
            <Card
                style = {{ borderRadius: '18px' }}
                title = 'Organizational Entities'>
                <div
                    style = {{ display: 'grid',
                        gap: '10px',
                        gridTemplateColumns: 'auto auto' }}>
                    <KindNode
                        data = { getDefaultData(Kind.Group) }
                        graph = { false } />
                    <KindNode
                        data = { getDefaultData(Kind.User) }
                        graph = { false } />
                </div>
            </Card>
            <Card title = 'Filters'>
                <div
                    style = {{ display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center' }}>
                    <span>Kinds</span>
                    <Select
                        mode = 'multiple'
                        onChange = { (value: string[]) => {
                            dispatch(setKindFilter(value));
                        } }
                        options = { allOptions }
                        style = {{ flex: 1 }}
                        value = { selectedKinds } />
                </div>

            </Card>

        </div>
    );
}

export default ComponentSelector;
