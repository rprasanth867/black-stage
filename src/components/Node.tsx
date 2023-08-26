import { ReactElement } from 'react'
import { Handle, Position } from 'reactflow'

interface INode {
    kind: string,
    type: string,
    children: any,
    graph: boolean,
    color?: string,
}
function Node(props: INode) {
  const {children, graph,type, kind, color} = props;
  const onDragStart = (event: any) => {
    if(!graph) {
        event.dataTransfer.setData('node:type', type);
        event.dataTransfer.setData('node:kind', kind);
        event.dataTransfer.effectAllowed = 'move';
    }
  };
  return (
    <div
    onDragStart={ onDragStart}
    draggable={!graph}>
        { graph && <Handle style={color ? {backgroundColor:color}:{}} type="target" position={Position.Left} isConnectable={true} />}
        {children}
        {graph && <Handle
        style={color ? {backgroundColor:color}:{}}
        type="source"
        position={Position.Right}
        isConnectable={true}
      />}
    </div>
  )
}

export default Node