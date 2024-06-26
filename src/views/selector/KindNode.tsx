import Icon from '@ant-design/icons';
import { Button } from 'antd';
import { ReactElement, useCallback } from 'react';
import { AiFillApi } from 'react-icons/ai';
import { BiLogoCodepen, BiSolidComponent } from 'react-icons/bi';
import { FaEdit, FaLaptopCode, FaUserAlt } from 'react-icons/fa';
import { FaDatabase, FaUserGroup } from 'react-icons/fa6';
import { HiOfficeBuilding, HiTemplate } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Kind } from 'utils/contants';

import Node from '../../components/Node';
import { initiateEditEntity } from '../../redux/reducers/catalog';
import { KindType, YAMLData } from '../graph/types';


interface IProps {
    data: YAMLData;
    graph?: boolean;
}

const getIcon = (kind: KindType): ReactElement | undefined => {
    switch (kind) {
    case Kind.Component: return <Icon component = { BiSolidComponent } />;
    case Kind.Template: return <Icon component = { HiTemplate } />;
    case Kind.API: return <Icon component = { AiFillApi } />;
    case Kind.Group: return <Icon component = { FaUserGroup } />;
    case Kind.User: return <Icon component = { FaUserAlt } />;
    case Kind.Resource: return <Icon component = { FaDatabase } />;
    case Kind.Location: return <Icon component = { HiOfficeBuilding } />;
    case Kind.Domain: return <Icon component = { BiLogoCodepen } />;
    case Kind.System: return <Icon component = { FaLaptopCode } />;
    }

};

const getColor = (kind: KindType): string => {
    switch (kind) {
    case Kind.Component: return '#1677FF';
    case Kind.Template: return '#faad14';
    case Kind.API: return '#1677FF';
    case Kind.Group: return 'green';
    case Kind.User: return 'green';
    case Kind.Resource: return '#1677FF';
    case Kind.Location: return '#faad14';
    case Kind.Domain: return '#1677FF';
    case Kind.System: return '#1677FF';
    default: return '#1677FF';
    }

};

function KindNode(props: IProps) {
    const { data, graph = true } = props;
    const dispatch = useDispatch();

    const editNode = useCallback(() => {
        dispatch(initiateEditEntity(data?.id));
    }, [ data ]);

    const nodeColor = getColor(data.kind);


    return (
        <Node
            color = { nodeColor }
            graph = { graph }
            kind = { data.kind }>
            <div
                style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    border: `1px ${nodeColor} solid`,
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '8px',
                    gap: '10px',
                    color: nodeColor }}>
                {getIcon(data?.kind)}
                {data.metadata?.title ?? data.metadata.name}
                {graph && <Button
                    icon = { <FaEdit /> }
                    onClick = { editNode }
                    type = 'text' />}
            </div>
        </Node>
    );
}

export default KindNode;
