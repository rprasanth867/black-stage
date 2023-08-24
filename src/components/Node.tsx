import { ReactElement } from 'react'
import { Handle, Position } from 'reactflow'

interface INode {
    kind: string,
    type: string,
    children: any,
    graph: boolean
}
function Node(props: INode) {
  const {children, graph,type, kind} = props;
  const onDragStart = (event: any) => {
    if(!graph) {
        event.dataTransfer.setData('node:type', type);
        event.dataTransfer.setData('node:kind', kind);
        event.dataTransfer.effectAllowed = 'move';
    }
  };
  return (
    <div style={{
        padding: '6px',
        borderRadius: '8px',
        backgroundColor: 'white',
        border: '1px #1a192b solid',
    }}
    onDragStart={ onDragStart}
    draggable={!graph}>
        { graph && <Handle type="target" position={Position.Left} isConnectable={true} />}
        {children}
        {graph && <Handle
        type="source"
        position={Position.Right}
        isConnectable={true}
      />}
    </div>
  )
}

export default Node