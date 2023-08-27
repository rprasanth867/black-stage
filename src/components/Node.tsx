import { Handle, Position } from 'reactflow';

interface INode {
    children: any;
    color?: string;
    graph: boolean;
    kind: string;
}
function Node(props: INode) {
    const { children, graph, kind, color } = props;
    const onDragStart = (event: any) => {
        if (!graph) {
            event.dataTransfer.setData('node:kind', kind);
            event.dataTransfer.effectAllowed = 'move';
        }
    };

    return (
        <div
            draggable = { !graph }
            onDragStart = { onDragStart }>
            { graph && <Handle
                isConnectable = { true }
                position = { Position.Left }
                style = { color ? { backgroundColor: color } : {} }
                type = 'target' />}
            {children}
            {graph && <Handle
                isConnectable = { true }
                position = { Position.Right }
                style = { color ? { backgroundColor: color } : {} }
                type = 'source' />}
        </div>
    );
}

export default Node;
