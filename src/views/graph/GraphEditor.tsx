import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Node,
    ReactFlowInstance,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useReactFlow
} from 'reactflow';
import { getEntitites } from 'service/catalog';
import { getDefaultNodeData } from 'utils/graph_util';

import CustomEdge from '../../components/Edge';
import { setEntities, setRelations } from '../../redux/reducers/catalog';
import { IReduxState } from '../../redux/store';
import KindNode from '../selector/KindNode';

import useGraph from './useGraph';


const nodeTypes = { kind: KindNode };

const edgeTypes = {
    buttonedge: CustomEdge
};

let id = 0;
const getId = () => `entity_${id++}`;

// layouting
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
        'elk.layered.spacing.nodeNodeBetweenLayers': 300,
        'elk.spacing.nodeNode': 120
    };

    const getLayoutedElements = useCallback((options: Record<string, any>) => {
        const layoutOptions = { ...defaultOptions,
            ...options };
        const graph: any = {
            id: 'root',
            layoutOptions,
            children: getNodes(),
            edges: getEdges()
        };

        elk.layout(graph).then(({ children }: any) => {
            // By mutating the children in-place we save ourselves from creating a
            // needless copy of the nodes array.
            children.forEach((node: any) => {
                if (node.position) {
                    node.position = { x: node.x,
                        y: node.y };
                }
            });

            setNodes(children);
            window.requestAnimationFrame(() => {
                fitView();
            });
        });
    }, [ getNodes, setNodes, getEdges, fitView ]);

    return { getLayoutedElements };
};


function GraphEditor() {
    const {
        entities: allEntities,
        relations: allRelations,
        kindFilter
    } = useSelector((state: IReduxState) => state.catalog);
    const entities = allEntities.filter(entity => kindFilter.includes(entity.data.kind));
    const entIds = entities.map(entity => entity.id);


    const relations = allRelations
    .filter(relation => entIds.includes(relation.source) && entIds.includes(relation.target));

    const dispatch = useDispatch();
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const [ reactFlowInstance, setReactFlowInstance ] = useState<ReactFlowInstance | null>(null);

    const { getLayoutedElements } = useLayoutedElements();


    useEffect(() => {

        getEntitites()
        .then(res => {
            const { entities: initEntitites, relations: initRelations } = useGraph(res.data);
            const lents = [];
            const lrels = [];
            const nodeIds = [];

            for (const ent of initEntitites) {
                nodeIds.push(ent.id);
                const newNode: Node = {
                    id: ent.id ?? '',
                    type: 'kind',
                    position: { x: 0,
                        y: 0 },
                    data: {
                        ...ent,
                        id: ent.id
                    }
                };

                lents.push(newNode);
            }


            for (const rel of initRelations) {
                if (nodeIds.includes(rel.source) && nodeIds.includes(rel.target)) {
                    const newEdge: Edge = {
                        id: rel.id,
                        source: rel.source,
                        label: rel.value,
                        target: rel.target,
                        type: 'buttonedge'
                    };

                    lrels.push(newEdge);
                }
            }
            dispatch(setEntities(lents));
            dispatch(setRelations(lrels));
            setTimeout(() => {
                getLayoutedElements({ 'elk.algorithm': 'layered',
                    'elk.direction': 'RIGHT' });
            }, 300);
        })
        .catch(err => {
            console.error('vrrr', err);
        });
    }, []);


    const onInit = useCallback(
    (instance: ReactFlowInstance) => setReactFlowInstance(instance),
    []
    );

    const onNodesChange = useCallback(
    (changes: any) => {
        dispatch(setEntities(applyNodeChanges(changes, allEntities)));
    }, [ allEntities ]
    );

    const onEdgesChange = useCallback(
    (changes: any) => {
        dispatch(setRelations(applyEdgeChanges(changes, allRelations)));
    }, [ allRelations ]
    );

    const onConnect = useCallback(
    (connection: any) => {
        dispatch(setRelations(addEdge({ ...connection,
            type: 'buttonedge' }, allRelations)));
    }, [ allRelations ]
    );

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (!reactFlowInstance) {
            return;
        }

        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        const kind = event.dataTransfer.getData('node:kind');

        const position = reactFlowInstance.project({
            x: event.clientX - (reactFlowBounds?.left || 0),
            y: event.clientY - (reactFlowBounds?.top || 0)
        });

        const nodeId = getId();

        const newNode: Node = {
            id: nodeId,
            type: 'kind',
            position,
            data: {
                ...getDefaultNodeData(kind, nodeId)
            }
        };

        dispatch(setEntities([ ...allEntities, newNode ]));
    },
    [ reactFlowInstance, allEntities ]
    );


    return (
        <div
            className = 'reactflow-wrapper'
            onDragOver = { onDragOver }
            onDrop = { onDrop }
            ref = { reactFlowWrapper }
            style = {{ flex: 1,
                height: '100vh' }}>
            <ReactFlow
                edgeTypes = { edgeTypes }
                edges = { relations }
                nodeTypes = { nodeTypes }
                nodes = { entities }
                onConnect = { onConnect }
                onEdgesChange = { onEdgesChange }
                onInit = { onInit }
                onNodesChange = { onNodesChange }>
                <Background />
                <Controls />
                {/* <Panel position="top-right">

        </Panel> */}
            </ReactFlow>
        </div>
    );
}

export default GraphEditor;
