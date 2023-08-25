import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowInstance } from 'reactflow';
import CustomNode from '../../components/Node';
import CustomEdge from '../../components/Edge';
import KindNode from '../selector/KindNode';
import { getDefaultNodeData } from './functions';
import { Kind } from '../selector/enums';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setEntities, setRelations } from '../../redux/reducers/catalog';

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = { kind: KindNode };

const edgeTypes = {
  buttonedge: CustomEdge,
};

let id = 0;
const getId = () => `entity_${id++}`;

function GraphEditor() {
  const { entities, relations } = useSelector((state:IReduxState)=> state.catalog);
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);


  const onInit = useCallback(
    (instance: ReactFlowInstance) => setReactFlowInstance(instance),
    []
  );

  const onNodesChange = useCallback(
    (changes: any) => {
      dispatch(setEntities(applyNodeChanges(changes, entities)));
    }, [entities]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      dispatch(setRelations(applyEdgeChanges(changes, relations)));
    }, [relations]
  );

  const onConnect = useCallback(
    (connection: any) => {
      dispatch(setRelations(addEdge({...connection,type:'buttonedge'}, relations)));
    },[relations]
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

      const nodeId = getId();

      const newNode: Node = {
        id: nodeId,
        type,
        position,
        data: {
          ...getDefaultNodeData(kind),
          id: nodeId
        },
      };

      dispatch(setEntities([...entities, newNode]));
    },
    [reactFlowInstance, entities]
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
        nodes={entities}
        edges={relations}
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
