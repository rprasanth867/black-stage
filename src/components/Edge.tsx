import { Select } from "antd";
import { ReactElement } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "reactflow";
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
                defaultValue="ownerOf"
                // size="small"
                onChange={handleChange}
                options={[
                    { value: 'ownerOf', label: 'ownerOf' },
                    { value: 'consumesApi', label: 'consumesApi' },
                    { value: 'apiProvidedBy', label: 'apiProvidedBy' },
                    { value: 'hasPart', label: 'hasPart' },
                    { value: 'parentOf', label: 'parentOf' },
                    { value: 'hasMember', label: 'hasMember' },
                    { value: 'dependsOn', label: 'dependsOn' }
                ]}
                />
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }
  
export default Edge