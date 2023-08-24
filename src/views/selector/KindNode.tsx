import React, { ReactElement, useCallback } from 'react'
import { Kind } from './enums';
import { BiSolidComponent } from 'react-icons/bi';
import Icon from '@ant-design/icons'
import { HiTemplate, HiOfficeBuilding } from 'react-icons/hi';
import { AiFillApi } from 'react-icons/ai';
import { FaUserAlt, FaEdit} from 'react-icons/fa';
import { FaUserGroup, FaDatabase } from 'react-icons/fa6';
import { BiLogoCodepen } from 'react-icons/bi';
import { GrSystem } from 'react-icons/gr';
import Node from '../../components/Node';
import { NodeType } from '../../components/enum';
import { YAMLData } from '../graph/types';
import { App, Button } from 'antd';
import EditNodeDialog from '../edit_node/EditNodeDialog';

interface IProps {
    data: YAMLData,
    graph?: boolean
}

const getIcon = (kind: Kind): ReactElement|undefined => {
    switch(kind) {
        case Kind.Component: return <Icon component={BiSolidComponent}/>
        case Kind.Template: return <Icon component={HiTemplate}/>
        case Kind.API: return <Icon component={AiFillApi}/>
        case Kind.Group: return <Icon component={FaUserGroup}/>
        case Kind.User: return <Icon component={FaUserAlt}/>
        case Kind.Resource: return <Icon component={FaDatabase}/>
        case Kind.Location: return <Icon component={HiOfficeBuilding}/>
        case Kind.Domain: return <Icon component={BiLogoCodepen}/>
        case Kind.System: return <Icon component={GrSystem}/>
    }

}
function KindNode(props: IProps) {
  const {data, graph=true} =props;
  const { modal } = App.useApp();

  const editNode = useCallback(() => {
    modal.confirm({
        width: '70%',
        icon: getIcon(data.kind),
        title: `Edit ${data.kind}`,
        content: <EditNodeDialog id='edit-node' data={data}/>,
        okText: 'Save',
        okButtonProps: {
            form: 'edit-node',
            htmlType: 'submit',
        }
    })
  },[data]);


  return (
    <Node graph={graph} type= {NodeType.kind} kind={data.kind}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'10px'}}>
            {getIcon(data?.kind)}
            {data.metadata.title ?? data.metadata.name}
            {graph && <Button type='text' icon={<FaEdit/>} onClick={editNode}/>}
        </div>

    </Node>
  )
}

export default KindNode