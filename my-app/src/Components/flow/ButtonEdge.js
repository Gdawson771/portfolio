import React, { useContext } from 'react';

import { Context } from "../../Context"
import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';
import "./Edgeindex.css"
import removeEdge from "../Proter/Order"
const foreignObjectSize = 40;


export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {

    const onEdgeClick = (evt, id) => {
        evt.stopPropagation();
        //  alert(`remove ${id}`);
        removeEdge(id)
    };
   // const { removeEdge } = useContext(Context)
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                    <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
                        ×
                    </button>
                </body>
            </foreignObject>
        </>
    );
}
