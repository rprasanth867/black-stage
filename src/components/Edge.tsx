import { Select } from "antd";
import { ReactElement } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "reactflow";
import { RelationUtil } from "utils/RelationUtil";
const onEdgeClick = (evt:any, id:any) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
  };

interface IEdge extends EdgeProps {
    
}
function Edge(props: IEdge) {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        source,
        target,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd,
      } = props;
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    } 

    
    
    const ops =  RelationUtil.getPossibleRelations(source,target)
    const options = [ops.map(op => ({value:op,label:op}))]
    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <Select
                style={{minWidth: '125px'}}
                defaultValue={ops[0]}
                onChange={handleChange}
                options={options}
                />
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }
  
export default Edge