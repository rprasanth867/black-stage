import { Select } from 'antd';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';
import { RelationUtil } from 'utils/RelationUtil';

type IEdge = EdgeProps;
function Edge(props: IEdge) {
    const {
        sourceX,
        sourceY,
        targetX,
        targetY,
        source,
        target,
        label,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd
    } = props;
    const [ edgePath, labelX, labelY ] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    const ops = RelationUtil.getPossibleRelations(source, target);
    const options = ops.map(op => {
        return { value: op,
            label: op };
    });

    return (
        <>
            <BaseEdge
                markerEnd = { markerEnd }
                path = { edgePath }
                style = { style } />
            <EdgeLabelRenderer>
                <div
                    className = 'nodrag nopan'
                    style = {{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,

                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all'
                    }}>
                    { ops.length > 1 ? <Select
                        defaultValue = { label as string || ops[0] }
                        onChange = { handleChange }
                        options = { options }
                        size = 'small'
                        style = {{ borderRadius: '10px' }} />
                        : <span
                            // eslint-disable-next-line indent
                                style = {{
                                border: '1px solid #d9d9d9',
                                backgroundColor: 'white',
                                padding: '4px',
                                borderRadius: '10px' }}>
                            {ops[0]}
                        </span>
                    }

                </div>
            </EdgeLabelRenderer>
        </>
    );
}

export default Edge;
