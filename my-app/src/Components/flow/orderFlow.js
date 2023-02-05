import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, addEdge, Background, MiniMap, Controls } from 'react-flow-renderer';
import { useCallback, useState, useContext } from 'react';
import { Context } from "../../Context"
// import initialNodes from './nodes.js';
// import initialEdges from './edges.js';

function orderFlow(props){
    
    const{edgesToFlow,nodes,setNodes,edges,setEdges}=useContext(Context)
    console.log("nodes in init are"+JSON.stringify(nodes))
 
    function generateTasks(){
  
    }
    const onNodesChange = useCallback(
      (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
      [setNodes]
    );
    const onEdgesChange = useCallback(
      (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      [setEdges]
    );
    
    const edgeTypes = {
      buttonedge: ButtonEdge,
    };
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge({ ...params, type: 'buttonedge' }, eds)),
      []
    );


    return (
        <ReactFlow
        nodes={(props.nodes)}
        edges={props.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="top-right"
        >
           <MiniMap />
          <Controls />
        </ReactFlow>
        
      );
}