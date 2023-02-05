import React, { useContext } from "react"
import useHover from "../../hooks/useHover"
import { Context } from "../../Context"
import "../../css/Tasks.css"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import Select from 'react-select'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactFlow, { getBezierPath, getEdgeCenter, getMarkerEnd, applyEdgeChanges, applyNodeChanges, addEdge, Background, MiniMap, Controls } from 'react-flow-renderer';

//import ButtonEdge from '../flow/ButtonEdge.js';

import "../flow/Edgeindex.css"
import { ContactsOutlined } from "@material-ui/icons"
const foreignObjectSize = 40;

export default function Order(props) {


    const { taskData, orderData, handleOrderChange, removeOrder } = useContext(Context)
    const [data, setData] = React.useState({
        id: props.id,
        name: props.name,
        arrivalDistribution: props.arrivalDistribution,
        tasksRequired: props.tasksRequired,
        infiniteArrivals: props.infiniteArrivals,
        arrivalRate: props.arrivalRate,
        arrivalLimit: props.arrivalLimit,
        durationEnd: props.durationEnd,
        arrayPos: props.arrayPos,
        removeOrderSelect: props.removeOrderSelect,
        limit: props.limit,
        edges: props.edges,
        units: props.units,
        nodes: props.nodes
    })
    const [orderOptions, setOrderOptions] = React.useState()
    const [effectFlag, setEffectFlag] = React.useState(false)
    const [hovered, ref] = useHover()
    const iconClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"
    const binColor = hovered ? "text-red-600" : "text-white"
    console.log("at start is " + props.infiniteArrivals)
    // const [limitType, setLimitType] = React.useState(props.infiniteArrivals ? "Time Limit" : "Simulation Limit")

    //


    React.useEffect(() => {
        setOrderOptions(taskData.map((task) => { return { value: task.name, label: task.name, id: task.id } }))
    }, [taskData])

    React.useEffect(() => {

        // setLimitType(props.infiniteArrivals ? "Time Limit" : "Simulation Limit")
        setData({
            id: props.id,
            name: props.name,
            arrivalDistribution: props.arrivalDistribution,
            tasksRequired: props.tasksRequired,
            infiniteArrivals: props.infiniteArrivals,
            arrivalRate: props.arrivalRate,
            durationEnd: props.durationEnd,
            removeOrderSelect: props.removeOrderSelect,
            arrayPos: props.arrayPos,
            units: props.units,
            arrivalLimit: props.arrivalLimit,
            nodes: props.nodes,
            edges: props.edges
        })
        setNodes(props.nodes)
        setEdges(props.edges)
        console.log("SETTING NODES")


    }, [props])

    function handleChange(event) {

        setData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }))
        //  setLimitType(props.infiniteArrivals ? "Time Limit" : "Simulation Limit")
        setEffectFlag(true)
    }
    function handleMultiselectChange(event) {

        console.log("tasks for this order are " + JSON.stringify(props.tasksRequired))
        //initialise new node
        //remove old node
        //maintain other nodes
        //For each node in new list which is not in previous list, initalise it
        //FOr each node in previous list not in new list remove it
        //For each node in previous list and in new list, keep it
        console.log("previous list of tasks required are" + JSON.stringify(data.tasksRequired))
        console.log("new list of tasks required are" + JSON.stringify(event))
        const newNodes = removeDuplicates(event.map((task) => {
            if (props.nodes) {
                props.nodes.map(
                    (prevNode) => {

                        console.log("node id is " + prevNode.id + " add task id is" + task.id)
                        if (task.id === prevNode.id)
                        //if this node already existed
                        {
                            console.log("one old node", JSON.stringify(prevNode))
                            return prevNode
                        }
                    }
                )

            }

            //if task id is not found in old tasks, create a default node
            console.log("one new node")
            return {
                id: task.id,
                data: { label: task.label },
                position: { x: 250, y: 25 },
            }
        })).concat(props.nodes.map(node => { console.log("is start node?" + node.id); if (node.id === "start") { return node } })).filter(n => n)

        // const newEdges=(edges.map((edge)=>{
        //     for(const newNode of newNodes)
        //     {
        //         if(edge.source==newNode.id)
        //     }
        // }))
        //For each edge, if edge.source is a node in new nodes and edge.dest is a edge in a new nodes then keep edges otherwise drop em
        console.log("new nodes are " + JSON.stringify(newNodes))
        const newEdges = removeDuplicates(edges.map((edge) => {

            for (const nodeA of newNodes) {
                for (const nodeB of newNodes) {
                    console.log("node combo is" + JSON.stringify(nodeA.id) + " and " + JSON.stringify(nodeB.id))
                    console.log("edge is " + JSON.stringify(edge))
                    if (edge.source == nodeA.id && edge.target == nodeB.id) {
                        return edge
                    }
                }
            }
            // return newNodes.map((newNode) => {
            //     return newNodes.map((newNode2 => {
            //         if (edge.source == newNode.id && edge.target==newNode2) {
            //             //save this edge
            //             console.log("saving edge")
            //             return edge
            //         }
            //     }))

            // })

            //else{return edge}
        })).filter(n => n)

        console.log("new list of nodes are:", newNodes)
        console.log("new list of edges are:", newEdges)
        setData(prevData => ({
            ...prevData,
            tasksRequired: event,
            nodes: newNodes,
            edges: newEdges
        }))
        setEffectFlag(true)
    }


    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    React.useEffect(() => {
        setEffectFlag(false)
        handleOrderChange(data)
    }, [effectFlag])

    function handleOrderRemoval() {

        removeOrder(props.id)
    }


    const [open, setOpen] = React.useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const limitType = props.infiniteArrivals ? "Time Limit" : "Simulation Limit"







    /**
     * React FLow state management
     * 
     */
    //  React.useEffect(setData(prevData=> prevDatanodes),[nodes])
    const [nodes, setNodes] = React.useState(props.nodes)
    const [edges, setEdges] = React.useState(props.edges);
    // React.useEffect(() => {
    //     console.log("tasks for this order are " + JSON.stringify(props.tasksRequired))
    //     setEdges([])
    //     //reset edges when data is changed
    //     setNodes([{
    //         id: "startingNode",
    //         type: "input",
    //         data: { label: "startNode" },
    //         position: { x: 250, y: 25 }
    //     }].concat(props.tasksRequired.map((task) => {
    //         return {
    //             id: task.id,
    //             //  type: 'input',
    //             data: { label: task.name },
    //             position: { x: 250, y: 25 },
    //         }
    //     })))
    // }, [props.tasksRequired])
    function removeEdge(id) {
        // go through all edges and drop any with matching id
        // edges.filter(edge => edge.id !== id)
        // setEdges(prevEdges => prevEdges.filter(edge => edge.id !== id))
        console.log("edges are" + JSON.stringify(edges))

        setData(prevData => ({
            ...prevData,
            edges: edges.filter(edge => edge.id !== id)
        }))
        //  setLimitType(props.infiniteArrivals ? "Time Limit" : "Simulation Limit")
        setEffectFlag(true)
    }
    const onNodesChange = React.useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds))
            // setData(prevData => ({
            //     ...prevData,
            //     nodes: nodes,
            //     edges:edges
            // }))
            // setEffectFlag(true)
        },
        [setNodes]
    );
    function nodesChanged() {

    }
    const onEdgesChange = React.useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const edgeTypes = {
        buttonedge: ButtonEdge,
    };
    const onConnect = React.useCallback(

        (params) => setEdges((eds) => addEdge({ ...params, type: 'buttonedge' }, eds)),
        []
    );
    function submitNodes(nodes) {
        setOpen(false)

        setData(prevData => ({
            ...prevData,
            nodes: nodes,
            edges: edges
        }))
        setEffectFlag(true)
    }
    /**CUSTOM EDGE FUNcTION */
    function isNumeric(n) {
        if (n == null) {
            console.log("is null" + n)
            return true
        }
        return (!isNaN(parseFloat(n)) && isFinite(n) && parseFloat(n) > 0) || n.length == 0;
    }
    function ButtonEdge({
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

    return (

        <div className="task--container text-white" id={props.id}>

            <form className="task--form">
                <Tippy content={<span>Unique name of this Order</span>}>
                    <label for="name">Order Name</label>
                </Tippy>
                <Tippy content={<span>Unique name of this Order</span>}>
                    <input

                        className="task--dropdown"
                        type="text"
                        id="name"
                        placeholder="New order name"
                        onChange={(event) => handleChange(event)}
                        name="name"
                        value={props.name}
                    />
                </Tippy>
                <Tippy content={<span>The distribution type for the duration of the task</span>}>
                    <label for="arrivalDistribution">Arrival Distribution</label>
                </Tippy>
                <Tippy content={<span>The distribution type for the duration of the task</span>}>
                    <select name="arrivalDistribution" className="task--dropdown" id="arrivalDistribution" onChange={(event) => handleChange(event)} value={props.arrivalDistribution}>

                        <option value="Constant" >Constant</option>
                        <option value="Exp" >Exponetial</option>
                        <option value="Uniform">Uniform</option>
                    </select>
                </Tippy>
                <Tippy content={props.arrivalDistribution === "U" ? <span>The start of the uniform range</span> : <span>The rate this order arrives at the scheduler</span>}>
                    <label for="arrivalRate">Arrival Rate</label>
                </Tippy>
                <div className="flex flex-col h-10">

                    <Tippy content={props.arrivalDistribution === "U" ? <span>The start of the uniform range</span> : <span>The rate this order arrives at the scheduler</span>}>
                        <input
                            className="task--dropdown"
                            type="text"
                            id="arrivalRate"
                            placeholder="New arrival Rate"
                            onChange={(event) => handleChange(event)}
                            name="arrivalRate"
                            value={props.arrivalRate}
                        />
                    </Tippy>
                    <span className="text-errorRed text-xs font-medium self-start w-taskInputW">
                        {!isNumeric(props.arrivalRate) && "Must be a positive decimal number"}
                    </span>
                </div>

                {props.arrivalDistribution === "Uniform" &&
                    <div className="flex flex-col h-10">

                        <Tippy content={<span>End of the uniform distribution range</span>}>
                            <input

                                className="task--dropdown"
                                type="text"
                                placeholder="End of the uniform range"
                                onChange={(event) => handleChange(event)}
                                name="durationEnd"
                                value={props.durationEnd}
                            />
                        </Tippy>
                        <span className="text-errorRed text-xs font-medium self-start w-taskInputW">
                            {!isNumeric(props.durationEnd) && "Must be a positive decimal number"}
                        </span>
                    </div>
                }
                <Tippy content={<span>The unit type for the rate of this order</span>}>
                    <label for="units">Unit Rate</label>
                </Tippy>
                <Tippy content={<span>The unit type for the rate of this order</span>}>
                    <select name="units" className="task--dropdown" id="units" onChange={(event) => handleChange(event)} value={props.units}>

                        <option value="Nanoseconds" >Nanoseconds</option>
                        <option value="Milliseconds" >Milliseconds</option>
                        <option value="Seconds" >Seconds</option>
                        <option value="Minutes" >Minutes</option>
                        <option value="Hours">Hours</option>
                    </select>
                </Tippy>

                {//Number 2
                }
                <Tippy content={<span>An optional limit for how many cases to generate</span>}>
                    <label for="arrivalLimit">Arrival Limit</label>
                </Tippy>
                <div className="flex flex-col h-10">

                    <Tippy content={<span>An optional limit for how many cases to generate</span>}>
                        <input
                            className="task--dropdown"
                            type="text"
                            id="arrivalLimit"
                            placeholder="New arrival Limit"
                            onChange={(event) => handleChange(event)}
                            name="arrivalLimit"
                            value={props.arrivalLimit}
                        />
                    </Tippy>
                    <span className="text-errorRed text-xs font-medium self-start w-taskInputW">
                        {!isNumeric(props.arrivalLimit) && "Must be a positive decimal number"}
                    </span>
                </div>



                <Tippy content={<span>Tasks required to complete this order</span>}>

                    <label for="tasks">Tasks Required</label>
                </Tippy>
                <Select
                    className="task--multiSelect"
                    isMulti
                    id="tasks"
                    placeholder="Tasks..."
                    name="tasks"
                    value={props.tasksRequired}
                    onChange={(event) => handleMultiselectChange(event)}
                    options={orderOptions}
                />


                <Tippy content={<span>Edit the flow of tasks</span>}>
                    <button type="button" className=" px-6 py-2 rounded shadow-2xl text-white text-lg bg-sunset3 m-auto" onClick={() => handleOpen(props)}>Edit Task Flow</button>
                </Tippy>
            </form>
            <div id={props.id} className={binColor}>
                <Tippy content={<span>Remove Order</span>}>
                    <i
                        className={iconClassName}
                        onClick={() => handleOrderRemoval()}
                        ref={ref}
                    >
                    </i>
                </Tippy>
            </div>
            <input
                type="checkbox"
                id="removeOrderSelect"
                name="removeOrderSelect"
                checked={props.removeOrderSelect}
                onChange={(event) => handleChange(event)} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="w-full h-5/6 flex flex-col">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Flow
                    </Typography>
                    <div className="w-full h-5/6">
                        <ReactFlow
                            nodes={(nodes)}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            edgeTypes={edgeTypes}
                            fitView
                            attributionPosition="top-right">
                            <MiniMap />
                            <Controls />
                        </ReactFlow>
                    </div>
                    <button type="button" className=" px-6 py-2 rounded shadow-2xl text-white text-lg bg-sunset3 m-auto" onClick={() => submitNodes(nodes)}>Submit Task Flow</button>

                    {/* <Button onClick={() => setOpen(false)}>Close</Button> */}
                </Box>
            </Modal>
        </div>
    )
}
//  onChange={(event) => handleMultiselectChange(event)}