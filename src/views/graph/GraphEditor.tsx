import React, { useCallback, useEffect, useRef, useState } from 'react';
import ELK from 'elkjs/lib/elk.bundled.js';

import ReactFlow, { Background, Controls, Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowInstance, useReactFlow, Panel } from 'reactflow';
import CustomNode from '../../components/Node';
import CustomEdge from '../../components/Edge';
import KindNode from '../selector/KindNode';
import { getDefaultNodeData } from './functions';
import { Kind } from '../selector/enums';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setEntities, setRelations } from '../../redux/reducers/catalog';
import useGraph from './useGraph';
import { Select } from 'antd';

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = { kind: KindNode };

const edgeTypes = {
  buttonedge: CustomEdge,
};

let id = 0;
const getId = () => `entity_${id++}`;

//layouting
const elk = new ELK();


const useLayoutedElements = () => {
  const {
    getNodes,
    setNodes,
    getEdges,
    fitView
  } = useReactFlow();
  
  const defaultOptions: Record<string, any> = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': 100,
    'elk.spacing.nodeNode': 80,
  };

  const getLayoutedElements = useCallback((options: Record<string, any>) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph: any = {
      id: 'root',
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }: any) => {
      // By mutating the children in-place we save ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node:any) => {
        if (node.position) {
          node.position = { x: node.x, y: node.y };
        }
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, [getNodes, setNodes, getEdges, fitView]);

  return { getLayoutedElements };
};


function GraphEditor() {
  const { entities:allEntities, relations: allRelations, kindFilter } = useSelector((state:IReduxState)=> state.catalog);
  const entities = allEntities.filter((entity)=>kindFilter.includes(entity.data.kind));
  const entIds = entities.map((entity)=> entity.id);
  const relations = allRelations.filter((relation)=> entIds.includes(relation.source) && entIds.includes(relation.target));
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { entities: ents, relations: rels } = useGraph();
  const { getLayoutedElements } = useLayoutedElements();


  useEffect(()=> {
    const lents=[]
    const lrels=[]
    const nodeIds= [];
    for(const ent of ents) {
      nodeIds.push(ent.id);
      const newNode: Node = {
        id: ent.id ?? '',
        type:'kind',
        position:{x:0,y:0},
        data: {
          ...ent,
          id: ent.id
        },
      };
      lents.push(newNode);
    }
    

    for(const rel of rels) {
      if(nodeIds.includes(rel.source) && nodeIds.includes(rel.target)) {
        const newEdge: Edge = {
          id: rel.source+":"+rel.target,
          source: rel.source,
          target: rel.target,
          type:'buttonedge'
        }
        lrels.push(newEdge)
      }
    }
    dispatch(setEntities(lents));
    dispatch(setRelations(lrels));

    setTimeout(()=> {
      getLayoutedElements({ 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' })
    }, 300)
   
  },[])


 


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
      const kind = event.dataTransfer.getData('node:kind');
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
        {/* <Panel position="top-right">
          
        </Panel> */}
      </ReactFlow>
    </div>
  );
}

export default GraphEditor;
