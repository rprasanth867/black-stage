import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowInstance } from 'reactflow';
import CustomNode from '../../components/Node';
import CustomEdge from '../../components/Edge';
import KindNode from '../selector/KindNode';
import { getDefaultNodeData } from './functions';
import { Kind } from '../selector/enums';

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = { kind: KindNode };

const edgeTypes = {
  buttonedge: CustomEdge,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

function GraphEditor() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  console.log('VRRRR nodes', nodes)
  console.log('VRRRR edges', edges)

  const onInit = useCallback(
    (instance: ReactFlowInstance) => setReactFlowInstance(instance),
    []
  );

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: any) => setEdges((eds: Edge[]) => addEdge({...connection,type:'buttonedge'}, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('node:type');
      const kind: Kind = event.dataTransfer.getData('node:kind') as Kind;
      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - (reactFlowBounds?.left || 0),
        y: event.clientY - (reactFlowBounds?.top || 0),
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: getDefaultNodeData(kind),
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );

  return (
    <div
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
      style={{ flex: 1, height: '100vh' }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default GraphEditor;
