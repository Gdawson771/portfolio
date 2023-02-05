import React, { useState, useRef, useEffect } from "react"
import Resource from "./Components/Proter/Resource"

import { nanoid } from 'nanoid'
import moment from 'moment'
import _, { orderBy } from 'lodash';
import colormap from 'colormap'
import { SupervisorAccountOutlined } from "@material-ui/icons"

const Context = React.createContext()
/**
 * TODO
 * Add edge removal DONE
 * Add error messages/validation checking DONE  
 * Format flow chart DONE
 * Add download JSON feature and upload JSON featurek,m
 */
function ContextProvider({ children }) {

    const fileRef = useRef();
    const [resources, setResources] = React.useState([])
    const [resourceData, setResourceData] = React.useState([])
    const [resourceItemElements, setResourceItemElements] = React.useState()
    const [resourceOrder, setResourceOrder] = React.useState([])
    const [page, setPage] = React.useState("resources")

    const [counter, setCounter] = React.useState(0)
    const [timeLineOptions, setTimeLineOptions] = React.useState({
        width: '100%',
        height: '600px',
        stack: false,
        showCurrentTime: false,
        zoomMin: 60 * 1000,
        //`  zoomMax: endTime,
        editable: false,
        selectable: false,

        // height: '400px',
        verticalScroll: true,
        horizontalScroll: true,
        showMajorLabels: true,

        zoomMin: 1000,
        type: 'background',
        format: {
            minorLabels: {
                minute: 'h:mma',
                hour: 'ha'
            }
        }
    })
    const [arrivalData, setArrivalData] = React.useState({
        infinteArrivals: "",
        duration: "",
        arrivalRate: ""
    })
    const [tasks, setTasks] = React.useState([])
    const [taskData, setTaskData] = React.useState([])
    const [taskElements, setTaskElements] = React.useState()
    const [taskOrder, setTaskOrder] = React.useState([])


    const [orders, setOrders] = React.useState([])
    const [orderData, setOrderData] = React.useState([])
    const [orderElements, setOrderElements] = React.useState()
    const [orderOrder, setOrderOrder] = React.useState([])


    const [infiniteArrivals, setInfiniteArrivals] = React.useState()
    const [orderLimit, setOrderLimit] = React.useState()
    const [newNodes, setNewNodes] = React.useState()
    const [nodes, setNodes] = React.useState()
    const [edges, setEdges] = useState([]);
    const [flowStructure, setFlowStructure] = React.useState()

    const [loadingbarStatus, setLoadingBarStatus] = React.useState(1)
    const [loadingbarLimit, setLoadingBarLimit] = React.useState(100)
    const [startingTime, setStartingTime] = React.useState(moment(new Date()).format("YYYY-MM-DDTkk:mm"))
    const [colorhash, setColorHash] = React.useState()
    const [responseText, setResponseText] = React.useState("")
    const [parsedItems, setParsedItems] = React.useState([])
    const [parsedResources, setParsedResources] = React.useState([])
    const [timeLineTaskGroups, setTimeLineTaskGroups] = React.useState([])
    const [timeLineTaskItems, setTimeLineTaskItems] = React.useState([])
    const [timeLineResourceGroups, setTimeLineResourceGroups] = React.useState([])
    const [timeLineResourceItems, setTimeLineResourceItems] = React.useState([])

    function addResourceSlot() {
        //    console.log("all ids are " + JSON.stringify(resourceData) + " and array pos is" + resourceOrder.length)
        setResourceData(prevData => [...prevData, { id: nanoid(), name: "", cost: "", arrayPos: prevData.length, limit: "", removeResource: false }])
        setResourceOrder(prevState => [...prevState, prevState.length])
    }

    function removeResource(id) {
        //remove this resource from any taskData's resource list
        console.log("task data before is " + JSON.stringify(taskData))
        setTaskData(prevData => prevData.map(item => {
            console.log(JSON.stringify(item))
            return {
                ...item, resources: item.resources.map(resource => {
                    if (resource !== null && resource !== undefined) {
                        if (resource.id === id) {
                            console.log("item removed")
                            return

                        }
                        else {
                            console.log("item kept")
                            return resource
                        }
                    }
                }).filter(n => n)
            }
        }).filter(n => n))
        console.log("task data is " + JSON.stringify(taskData))
        setResourceData(prevItems => prevItems.filter(item => item.id !== id).filter(n => n))
    }
    function removeSelectedResources() {
        resourceData.map((item) => {
            if (item.removeResource) {
                console.log("removing")
                removeResource(item.id)
            }

        })


    }
    React.useEffect(() => {
        console.log("RESOURCES ARE", JSON.stringify(resourceData))
    }, [resourceData])
    function removeResourcesQuery(id) {
        //remove this resource from any taskData's resource list
        console.log("task data before is " + JSON.stringify(taskData))
        return (taskData.map(item => {
            console.log(JSON.stringify(item))
            return (
                item.resources.map(resource => {
                    if (resource !== null && resource !== undefined) {
                        if (resource.id === id) {
                            console.log("item affected:" + JSON.stringify(item.name))
                            return item.name

                        }

                    }
                })
            )
        }))
        // console.log("task data is " + JSON.stringify(taskData))
        // setResourceData(prevItems => prevItems.filter(item => item.id !== id))
    }
    function removeSelectedResourcesTasksQuery(resources) {
        //for eacj task,
        //  for each resource in that task, if any of them are in resources, return tasks
        const response = []
        return taskData.map((task) => {
            console.log("task resources are", JSON.stringify(task.resources))
            for (const r of task.resources) {
                console.log(" resources are", JSON.stringify(resources))
                for (const r2 of resources) {
                    if (r.id == r2.id) {
                        console.log("task affected")
                        return task.name
                    }
                }

            }
        })
        // for (const r of resources) {
        //     response.push(taskData.map(item => {
        //         console.log(JSON.stringify(item))
        //         return (

        //             item.resources.map(resource => {
        //                 if (resource !== null && resource !== undefined) {
        //                     if (resource.id===r.id) {
        //                         console.log("item affected:" + JSON.stringify(item.name))
        //                         return item.name

        //                     }

        //                 }
        //             })
        //         )
        //     }))
        // }
    }
    function removeSelectedResourcesQuery() {
        return (resourceData.filter(item => item.removeResource))
    }




    function handleResourceChange(newData) {
        setResourceData(prevData => {
            //   console.log("new data is " + JSON.stringify(newData))
            //     console.log("new prevData is " + JSON.stringify(prevData))


            const updatedData = prevData.filter(item => item.id !== newData.id)
            // console.log("updatedData is " + JSON.stringify(updatedData))
            return [...updatedData, newData]
        })
        setTaskData(prevData => prevData.map(item => {
            return {
                ...item, resources: item.resources.map(resource => {
                    console.log("line 77" + JSON.stringify(resource))
                    console.log("line 78" + JSON.stringify(newData))
                    if (resource !== null && resource !== undefined) {
                        if (resource.id === newData.id) {
                            //console.log("item removed")
                            return { value: newData.name, label: newData.name, id: newData.id }

                        }
                        else {
                            console.log("item kept")
                            return resource
                        }
                    }
                })
            }
        }))
        /*   setTaskData(prevData=>prevData.map(item=> {return item.resources.map(resource=>{
               if(resource.id===newData.id)
               {return{value:newData.name,label:newData.name,id:newData.id}}
               else{return resource}
             })}))*/
        //           console.log("data is "+ JSON.stringify(resourceData))

    }
    /*setResourceData(prevData => ([
        ...prevData,
        {
            [event.target.name]: event.target.value
        }]
    ))*/

    /* React.useEffect(() => {
 
         const sortedArray = resourceData.sort((a, b) => { return a.arrayPos - b.arrayPos })
         console.log("sorted array is " + JSON.stringify(sortedArray))
         console.log(resourceData.length === 0)
         setResourceItemElements(resourceData.map(item => (
             <Resource id={item.id} name={item.name} cost={item.cost} arrayPos={item.arrayPos} />)))
          if(resourceData.length===0)
          {
  
          }
         else {setResourceItemElements(prevState => {
              const sortedArray = prevState.sort((a, b) =>{ return a.arrayPos - b.arrayPos})
              return sortedArray.map(item => (
                  <Resource id={item.id} name={item.name} cost={item.cost} />))
          })}
     }
         , [resourceData])
         */

    //TASKS
    function addTasksSlot() {

        //    console.log("all ids are " + JSON.stringify(resourceData) + " and array pos is" + resourceOrder.length)
        console.log("TASK added")
        setTaskData(prevData => [...prevData, {
            id: nanoid(),
            name: "",
            cost: "",
            durationDropdown: "Constant",
            costDropdown: "Constant",
            priorityDropdown: "2",
            duration: "",
            resources: [],
            removeTask: false,
            units: "Minutes",
            durationEnd: "",
            costEnd: "",
            arrayPos: taskOrder.length,
            resourceQuantityList: []
        }])
        setTaskOrder(prevState => [...prevState, prevState.length])

    }

    function removeTask(id) {
        /**
         * Whenever a task is removed, update order data to remove any nodes which have that task id
         * Go through each order and for each order go through each task, if task id matches removeTask id do not keep that node, otherwise keep the node
         */
        setOrderData(prevData => prevData.map(item => {
            console.log(JSON.stringify(item))

            // if(item.nodes){

            //      setNewNodes(item.nodes.map((prevNode)=>{
            //         if(id===prevNode.id)
            //         {
            //             //Node is id of node to be removed
            //             //return
            //         }
            //         else{
            //             return prevNode
            //         }
            //     }))
            // }
            const newNodes = removeDuplicates(item.tasksRequired.map(task => {
                if (task !== null && task !== undefined) {
                    console.log("in nodes, task is defined")
                    //Go though each node, if we get an id match return that node, else default that node
                    const nodesToConcat = []
                    for (const node of item.nodes) {
                        // ...use `element`..
                        console.log("node id is", node.id)
                        console.log("node to match is", id)
                        if (node.id == id || node.id == "start") {
                            //do not return the node, this is the node to be removed
                        }
                        else {
                            nodesToConcat.push(node)
                            //return node
                        }
                    }
                    return [...nodesToConcat]


                }
            }).flat(1)
                .concat(item.nodes.map(node => { console.log("is start node?" + node.id); if (node.id === "start") { return node } }))
                .filter(n => n))
            console.log("new NOdes", newNodes)
            const newEdges = item.edges.map((edge) => {
                if (edge.source == id || edge.target == id) {
                    console.log("removing edge")

                }
                else { return edge }
            }).filter(n => n)

            return {
                ...item, tasksRequired: item.tasksRequired.map(task => {
                    if (task !== null && task !== undefined) {
                        if (task.id === id) {
                            console.log("item removed")
                            return
                        }
                        else {
                            console.log("item kept")
                            return task
                        }
                    }
                }).filter(n => n),
                nodes: newNodes
                , edges: newEdges

            }
        }))

        // setResourceData(prevItems => prevItems.filter(item => item.id !== id))
        setTaskData(prevItems => prevItems.filter(item => item.id !== id))
    }
    function removeDuplicates(arr) {

        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    function removeTasksQuery(id) {
        //remove this resource from any taskData's resource list
        console.log("order data before is " + JSON.stringify(orderData))
        return (orderData.map(item => {
            console.log(JSON.stringify(item))
            return (
                item.tasksRequired.map(task => {
                    if (task !== null && task !== undefined) {
                        if (task.id === id) {
                            console.log("item affected:" + JSON.stringify(item.name))
                            return item.name

                        }

                    }
                })
            )
        }))
        console.log("task data is " + JSON.stringify(taskData))
        setResourceData(prevItems => prevItems.filter(item => item.id !== id))
    }


    function removeTasksMultiQueryO() {
        //remove this resource from any taskData's resource list
        //for each task if task in an order 
        return (removeDuplicates(taskData.map((task) => {
            for (const o of orderData) {
                for (const t of o.tasksRequired) {
                    if (task.id === t.id) {
                        return o.name
                    }
                }
            }
        }).filter(n => n)).join(", "))
    }
    function removeTasksMultiQueryT() {
        //remove this resource from any taskData's resource list
        //for each task if task in an order 
        return (taskData.map((task) => {
            if (task.removeTask) {
                return task.name
            }
        }).filter(n => n).join(", "))
    }
    function removeTasksMulti() {

        taskData.map((task) => {
            if (task.removeTask) {
                removeTask(task.id)
            }
        })

    }
    function addOrderSlot() {

        //    console.log("all ids are " + JSON.stringify(resourceData) + " and array pos is" + resourceOrder.length)
        console.log("order added")
        setOrderData(prevData => [...prevData, {
            id: nanoid(),
            name: "",
            arrivalDistribution: "Constant",
            tasksRequired: [],
            units: "Seconds",
            infiniteArrivals: false,
            arrivalRate: "",
            arrivalLimit: "",
            removeOrderSelect: false,
            durationEnd: "",
            arrayPos: orderOrder.length,
            edges: [],
            nodes: [{
                id: "start",
                type: "input",
                data: { label: "startNode" },
                position: { x: 250, y: 25 }
            }]
        }])
        setOrderOrder(prevState => [...prevState, prevState.length])

    }

    function removeOrder(id) {
        setOrderData(prevItems => prevItems.filter(item => item.id !== id))
    }


    function handleTaskChange(newData) {

        setOrderData(prevData => prevData.map(item => {
            return {
                ...item, tasksRequired: item.tasksRequired.map(task => {
                    console.log("line 77" + JSON.stringify(task))
                    console.log("line 78" + JSON.stringify(newData))
                    if (task !== null && task !== undefined) {
                        if (task.id === newData.id) {
                            console.log("item removed")
                            return { value: newData.name, label: newData.name, id: newData.id }
                        }
                        else {
                            console.log("item kept")
                            return task
                        }
                    }
                })
            }
        }))


        setTaskData(prevData => {
            //   console.log("new data is " + JSON.stringify(newData))
            //   console.log("new prevData is " + JSON.stringify(prevData))
            const updatedData = prevData.filter(item => item.id !== newData.id)
            //  console.log("updatedData is " + JSON.stringify(updatedData))
            return [...updatedData, newData]
        })
        //           console.log("data is "+ JSON.stringify(resourceData))

    }




    function handleOrderChange(newData) {
        setOrderData(prevData => {
            //   console.log("new data is " + JSON.stringify(newData))
            //   console.log("new prevData is " + JSON.stringify(prevData))
            const updatedData = prevData.filter(item => item.id !== newData.id)
            //  console.log("updatedData is " + JSON.stringify(updatedData))
            return [...updatedData, newData]
        })
        //           console.log("data is "+ JSON.stringify(resourceData))

    }


    React.useEffect(() => {

        const sortedArray = orderData.sort((a, b) => { return a.arrayPos - b.arrayPos })
        console.log("tasks sorted array is " + JSON.stringify(sortedArray))
        console.log(resourceData.length === 0)
        console.log("rendering task")

    }
        , [orderData])

    const inputTypes = {
        input: "input"
    }

    function removeEdge(id) {
        // go through all edges and drop any with matching id
        setEdges(prevEdges => prevEdges.filter(edge => edge.id !== id))
        console.log("edges are" + JSON.stringify(edges))
    }
    function edgesToFlow(order) {
        console.log("flow for one task is " + JSON.stringify(flowParser(order)))
        return flowParser(order)
        // const destAndSource = order.edges.map((edge) => { return { source: edge.source, target: edge.target } })

        // const result = _(destAndSource)
        //     .groupBy(x => x.source)
        //     .map((value, key) => ({ source: key, targets: value }))
        //     .value();

        // const flowStruct = JSON.stringify(flowHelper(result))


        // //   console.log("destAndSource " + JSON.stringify(destAndSource))
        // console.log("destAndSource2 " + JSON.stringify(result))
        // console.log("flow helper return is" + flowStruct)
        // // const items = result.map((item) => {
        // //    return (item.source + "->" + item.targets.map((dest) => { return (dest.target) }))
        // //  })
        // let structWithTaskNames = flowStruct
        // taskData.map((task) => {

        //     structWithTaskNames = structWithTaskNames.replace(task.id, task.name)
        // })
        // console.log("flow helper return with real names is" + structWithTaskNames)
        // console.log("flow helper with starting node dropped is" + structWithTaskNames.substring(5))
        // return structWithTaskNames.substring(10).slice(0, -1)
        // return 0

    }
    function flowParser(order) {
        const destAndSource = order.edges.map((edge) => { return { source: edge.source, target: edge.target } })

        const result = _(destAndSource)
            .groupBy(x => x.source)
            .map((value, key) => ({ source: key, targets: value }))
            .value();

        const baseCase = result.filter(item => item.source === "start")
        //console.log("base case is", JSON.stringify(baseCase))
        // console.log("All edges are", JSON.stringify(result))
        if (baseCase[0].targets.length == 0) {

            // console.log("No edges")
        }
        else if (baseCase[0].targets.length == 1) {
            // console.log("One Edge")
            //if this edge is terminal, return ITask
            //if this edge has children, return IThen 
            if (hasChildren(result, baseCase[0].targets[0].target)) {
                // console.log("Child node has children")
                //   const sourceTree = results.filter(nextCase => nextCase.source === baseCase[0].targets[0].target)

                const recursionBaseCase = baseCase[0].targets.map((item) => {
                    //console.log("recursion item is " + JSON.stringify(flowParserHelper(result, item.target, false)))
                    return flowParserHelper(result, item.target, false)
                })
                //console.log("RECURSION BASE IN 1 edge is " + JSON.stringify(recursionBaseCase))
                return ({
                    IThen: {//returnITask(baseCase[0].targets[0].target),
                        args: [...recursionBaseCase[0]]
                    }
                })
            }
            else {
                //  console.log("Child node has no children")
                return returnITask(baseCase[0].targets[0].target)
            }
        }
        else if (baseCase[0].targets.length > 1) {
            // console.log("more than 1 edge")
            //for each edge return an IPAR of the flow parser helper
            const recursionBaseCase = baseCase[0].targets.map((item) => {
                return flowParserHelper(result, item.target, true)
            })
            return ({
                IPar: {
                    args: [...(recursionBaseCase.flat(1))]
                }
            })
        }
        else {
            //console.log("EDGES ERROR, null edges")
        }
    }

    function flowParserHelper(tree, source, prevIPar) {
        // console.log("Finding edges for " + JSON.stringify(source))
        const sourceTree = tree.filter(nextCase => nextCase.source === source)
        if (sourceTree[0] == null) {
            //  console.log("NUll source tree")
            return [returnITask(source)]
        }
        else if (sourceTree[0].targets.length == 0) {
            //  console.log("No edges")
            return [returnITask(source)]
        }
        else if (sourceTree[0].targets.length == 1) {
            //  console.log("1 edge")
            // console.log("PrevIPAR is", prevIPar)
            if (prevIPar == false) {
                const recursionCase = sourceTree[0].targets.map((item) => {
                    return flowParserHelper(tree, item.target, false)
                })
                return [returnITask(source), ...recursionCase[0]]
            }
            else if (prevIPar == true) {
                const recursionCase = sourceTree[0].targets.map((item) => {
                    return flowParserHelper(tree, item.target, false)
                })
                return ({
                    IThen: {
                        args: [returnITask(source), recursionCase[0]]
                    }
                })
            }
            // const recursionCase = sourceTree[0].targets.map((item) => {
            //     return flowParserHelper(tree, item.target)
            // })
            // return ({
            //     IThen: {
            //         args: [returnITask(source),...recursionCase]
            //     }
            // })
            // return returnITask(source)
        }
        else if (sourceTree[0].targets.length > 1) {
            //  console.log("Multiple edges")
            // const recursionCase = sourceTree[0].targets.map((item) => {
            //     return flowParserHelper(tree, item.target, true)
            // })
            if (prevIPar == false) {
                const recursionCase = sourceTree[0].targets.map((item) => {
                    return flowParserHelper(tree, item.target, true)
                })
                const IPar = { IPar: { args: [...recursionCase] } }
                return ([returnITask(source), IPar])
            }
            else if (prevIPar == true) {
                const recursionCase = sourceTree[0].targets.map((item) => {
                    return flowParserHelper(tree, item.target, true)
                })
                const IPar = { IPar: { args: [...recursionCase] } }
                return ({ IThen: { args: [returnITask(source), IPar] } })
            }
            // return ({
            //     IThen: {
            //         args: {
            //             [returnITask(source),
            //                 ]
            //         }
            //     }
            // })
        }
        else {
            //  console.log("EDGES ERROR, null edges")
        }
    }
    function hasChildren(tree, target) {
        const sourceTree = tree.filter(nextCase => nextCase.source === target)
        //console.log("Source tree in child finder is" + JSON.stringify(sourceTree))
        if (sourceTree[0] == null) {
            // console.log("NUll source tree")
            return false
        }
        if (sourceTree[0].targets.length == 0) {
            return false
        }
        else { return true }
    }
    function returnITask(target) {
        for (const task of taskData) {
            //    console.log("TASK IS" + JSON.stringify(task))
            //   console.log("TASK To find is" + JSON.stringify(target))
            if (task.id === target) {
                //    console.log("FOUND TASK")
                //calculate cost if uniform and duration if uniform
                const valueDuration = task.durationDropdown === "Uniform" ? {
                    from: unitsToMinutes(task.units, parseFloat(task.duration)),
                    to: unitsToMinutes(task.units, parseFloat(task.durationEnd))
                } : {
                    value: unitsToMinutes(task.units, parseFloat((task.duration)))
                }
                const valueCost = task.costDropdown === "Uniform" ? {
                    from: Number(task.cost),
                    to: Number(task.costEnd)
                } : {
                    value: Number(task.duration)
                }


                return {
                    ITask: {
                        name: task.name,
                        duration: {
                            ["I" + task.durationDropdown]: valueDuration
                        },
                        cost: {
                            ["I" + task.costDropdown]: valueCost
                        },
                        resources: task.resources.map((orderResource) => {
                            //  console.log("R is " + JSON.stringify(orderResource))
                            //  console.log("ALL R is " + JSON.stringify(resourceData))

                            //  console.log("R is " + JSON.stringify(r))
                            //  console.log("OR is " + JSON.stringify(orderResource))

                            //  console.log("are equal resources")
                            for (const listItem of task.resourceQuantityList) {
                                if (listItem[0] == orderResource.id) {
                                    return {
                                        resource: orderResource.value,
                                        quantity: Number(listItem[1])
                                    }


                                }
                            }

                            return {
                                resource: orderResource.value,
                                quantity: Number(1)
                            }


                        }),
                        priority: 2 //Number(task.priorityDropdown)
                    }
                }
                //
            }
            // return {
            //     ITask: {

            //     }
        }
    }
    function flowHelper(results) {

        const baseCase = results.filter(item => item.source === "start")
        console.log("base case is" + JSON.stringify(baseCase[0]))
        console.log("base case is" + JSON.stringify(baseCase[0].targets))
        //return starting node
        //for each target in starting node return that node and a "+" and if that node has children return  "=>" and + of children

        const flowHelperTest = baseCase[0].targets.map(target => flowHelper2(results, target.target))
        //if map is more than 1 in size return a concat with + between evcerythign with brackets on either end
        const flowResult = baseCase[0].source + " -> " + "(" + flowHelperTest.join("+") + ")"
        console.log("expanded case is" + JSON.stringify(flowResult))

        return (flowResult)
    }

    function flowHelper2(tree, source) {

        const sourceTree = tree.filter(nextCase => nextCase.source === source)
        console.log("tree is" + JSON.stringify(tree))
        console.log(sourceTree)
        console.log(source)
        console.log(sourceTree.length)
        if (sourceTree.length === 0) {
            console.log("end of recursion")
            return source
        }
        //  else if(sourceTree.length===1){
        //const returnString = source + "->" +sourceTree.targets[0].target
        //return sourceTree.targets[0].target
        //  }
        else {
            const NextLevel = sourceTree[0].targets.map(target => flowHelper2(tree, target.target))
            return "(" + source + " -> " + "(" + NextLevel.join(" | ") + ")" + ")"

        }
    }
    /**
     * TODO
     * Functino which converts list of tasks to list of nodes and edges
     * 
     * Function which a list of nodes and edges to a flow order eg ()
     */

    function Submit() {

        // const resources2 = resourceData.map((item) => {
        //     return {
        //         name: item.name,
        //         costPerTick: Number(item.cost)

        //     }
        // })
        //  console.log("all resources are " + JSON.stringify(resources2))
        setPage("Results")
        console.log("all resources are " + JSON.stringify(resourceData))
        // const tasks = taskData.map((task) => {
        //     return {
        //         name: task.name,
        //         duration: {
        //             distType: task.durationDropdown,
        //             value1: task.duration
        //         },
        //         cost: {
        //             distType: task.costDropdown,
        //             value1: task.cost
        //         },
        //         resources: {
        //             resources: task.resources
        //         },
        //         priority: task.priorityDropdown
        //     }
        // })
        const orders = orderData.map((order) => {
            //   console.log("priority dropdown should be " +order.priorityDropdown)
            const arrivalsValue = order.arrivalDistribution == "Uniform" ? {
                value: unitsToMinutes(order.units, parseFloat(order.arrivalRate)),
                value2: unitsToMinutes(order.units, parseFloat(order.durationEnd))
            } : {
                value: unitsToMinutes(order.units, parseFloat(order.arrivalRate))
            }
            const orderFlow = flowParser(order)
            console.log("Order arrival limit is" + order.arrivalLimit)
            if (Number(order.arrivalLimit) > 0) {
                return {
                    name: order.name,
                    flow: orderFlow
                    ,
                    rate: {
                        ["I" + order.arrivalDistribution]: arrivalsValue
                    },
                    limit: order.arrivalLimit
                }
            }
            else {
                //       const convertedRate=unitsToMinutes(arrivalsValue)
                return {
                    name: order.name,
                    flow: orderFlow
                    ,
                    rate: {
                        ["I" + order.arrivalDistribution]: arrivalsValue
                    },


                }
            }


        })
        const resources2 = resourceData.map((item) => {

            return {
                name: item.name,
                capacity: item.limit,
                costPerTick: Number(item.cost)

            }
        }).filter(n => n)


        var jsonExport
        if (Number(orderLimit) > 0) {
            setLoadingBarLimit(Number(orderLimit))
            jsonExport = {
                arrivals: orders,
                resources: resources2,
                "timeLimit": Number(orderLimit)
            }
        }
        else {
            jsonExport = {
                arrivals: orders,
                resources: resources2
            }

        }
        // const jsonExport = {

        //     arrivals: [
        //         {
        //             simulation: {
        //                 name: "GUI Export",
        //                 flow: {
        //                     tasks: { tasks },
        //                     ordering: flowStructure
        //                 }
        //             },
        //             infinte: arrivalData.infiniteArrivals,
        //             rate: {
        //                 distType: arrivalData.arrivalRate,
        //                 value1: arrivalData.duration
        //             },
        //             simulationLimit: null,
        //             timeLimit: 88,

        //         }],
        //     resources: resources
        // }

        console.log("CURRENT OUTPUT" + JSON.stringify(jsonExport))
        submitHelper(JSON.stringify(jsonExport))
    }
    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }
    React.useEffect(() => {
        console.log("loading bar status is", loadingbarStatus)
        console.log("loading bar status is", loadingbarLimit)
    }, [loadingbarStatus])

    function unitsToMinutes(unitType, value) {
        console.log("unittype is ", unitType)
        if (unitType === "Hours") {
            return value * 60
        }
        else if (unitType === "Seconds") {
            return value / 60
        }
        else if (unitType === "Milliseconds") {
            return value / 60000
        }
        else if (unitType === "Nanoseconds") {
            return value / 60000000000
        }
        else if (unitType === "Minutes") { return value }
    }
    React.useEffect(() => {

        console.log("1 parsedItems are" + JSON.stringify(parsedItems))
        console.log("2 and taskData are" + JSON.stringify(taskData))

        const groups2 = parsedItems.reduce((groups, item) => ({
            ...groups,
            [item.task]: [...(groups[item.task] || []), item]
        }), {});
        console.log("grouped groups are" + JSON.stringify(groups2))
        const Tgroups = taskData.map((task) => {
            return { id: task.name, content: task.name }
        })
        console.log(" groups are" + JSON.stringify(Tgroups))
        setTimeLineTaskGroups(Tgroups)

        const Rgroups = resourceData.map((resource) => {
            return { id: resource.name, content: resource.name }
        })
        console.log(" Rgroups are" + JSON.stringify(Rgroups))
        setTimeLineResourceGroups(Rgroups)
        // const formattedGroups=groups.map((item)=>{
        //     console.log("group is",item)
        //     return
        // })
        const taskNames = parsedItems.map((item) => {
            return item.task
        })
        const resourceNames = parsedItems.map((item) => {
            return resourceData.name
        })
        // const resourceNames= parsedItems.map()
        const chash = getColorHash(taskNames)
        const chash2 = getColorHash(resourceNames)
        // const startingTimeFormatted=moment(startingTime, 'YYYY-MM-DD    ').toDate();
        console.log("starting time is " + startingTime)
        const taskItems = removeDuplicates(parsedItems.map((item) => {
            const color = chash[item.task];
            console.log("colorhash is " + color)
            console.log("chash is " + JSON.stringify(item))
            const localStart = moment(startingTime)
            const localEnd = moment(startingTime)
            return { id: item.id, content: item.task, start: localStart.add(item.starting_time, 'minute'), end: localEnd.add(item.ending_time, 'minute'), style: `background-color: ${color}`, group: item.task }
            // return { id: item.id, content: item.task, start: new Date(startingTimeFormatted + ( item.starting_time*60*60*1000)), end: new Date(startingTimeFormatted + (  item.starting_time*60*60*1000) ),style: `background-color: ${color}`, }
        }))
        const resourceItems = removeDuplicates(parsedItems.map((item) => {

            //for set of resources, return a list of when each resouce starts and ends, then we must concatenate the lists
            console.log("chash is " + JSON.stringify(item))
            const newResources = []
            // for(const r in item.task.resources){
            //     newResources.append({ id:r, content: r, start: localStart.add(item.starting_time, 'hour'), end: localEnd.add(item.ending_time, 'hour'), style: `background-color: ${color}`, group: item.task }
            //     )
            // }
            const keys = Object.keys(item.resources)
            keys.forEach((key, index) => {
                const localStart = moment(startingTime)
                const localEnd = moment(startingTime)
                const color = chash2[key];
                newResources.push({ id: item.id + key, content: key, start: localStart.add(item.starting_time, 'minute'), end: localEnd.add(item.ending_time, 'minute'), style: `background-color: ${color}`, group: key }
                )
            })
            console.log("NEW R IS", JSON.stringify(newResources))
            console.log("KEYS OF R IS", JSON.stringify(keys))
            return newResources
            // if(item.task.resources.length==0){
            //     return
            // }
            // else if(item.task.resources==1){
            //     var name = Object.keys(resources)[0]
            //     return { id:name, content: name, start: localStart.add(item.starting_time, 'hour'), end: localEnd.add(item.ending_time, 'hour'), style: `background-color: ${color}`, group: item.task }

            // }
            // else if(item.task.resources>1){
            //     return item.task.resources.map((resource)=>{
            //         var name = Object.keys(resource)[0]
            //         return { id:name, content: name, start: localStart.add(item.starting_time, 'hour'), end: localEnd.add(item.ending_time, 'hour'), style: `background-color: ${color}`, group: item.task }

            //     })
            // }

            // return { id: item.id, content: item.task, start: new Date(startingTimeFormatted + ( item.starting_time*60*60*1000)), end: new Date(startingTimeFormatted + (  item.starting_time*60*60*1000) ),style: `background-color: ${color}`, }
        }).flat(1))
        console.log("resource items is " + JSON.stringify(resourceItems))
        setTimeLineOptions((prevOptions) => {
            return { ...prevOptions, start: moment(startingTime) }
        })
        setTimeLineResourceItems(resourceItems)
        setTimeLineTaskItems(taskItems)
        // if (groups.length > 1) {
        //     const formattedGroups = groups.map((item) => {
        //         console.log("group is", item)
        //         return
        //     })
        // }
        //   console.log("3 items are" + JSON.stringify(items))




    }, [parsedItems])

    function submitHelper(formJSON) {

        var defaultData = `{
            "arrivals" : [
              {
                "name" : "Example1",
                "flow" : {
                  "ITask" : {
                    "name" : "T1",
                    "duration" : {
                      "IConstant" : {
                        "value" : 1.0
                      }
                    },
                    "cost" : {
                      "IConstant" : {
                        "value" : 2.0
                      }
                    },
                    "resources" : [],
                    "priority" : 0
                  }
                },
                "rate" : {
                  "IConstant" : {
                    "value" : 1.0
                  }
                }
              }
            ],
            "resources" : [
            ],
            "timeLimit" : 200
          }`;
        //  e.preventDefault();

        var form = document.getElementById('idForm')
        var request = document.getElementById("request")

        var value = formJSON
        // action="http://localhost:8080/stream" 
        // var actionUrl = form.getAttribute('action');
        var actionUrl = "http://localhost:8080/stream"
        var xhr = new XMLHttpRequest()
        xhr.open("POST", actionUrl, true)
        xhr.onprogress = function (event) {
            var textarea = document.getElementById('response');
            var data = xhr.responseText
            if (xhr.status === 200) {
                console.log("FN21187")
                if (data.slice(-1) !== "]") {
                    data = data + "]"

                }
                var json = JSON.parse(data)
                var eventTypes = json.map(x => {
                    var key = Object.keys(x)[0]
                    //console.log("item in json is" + x + " and key is " + key)
                    var time = x[key]["time"]

                    console.log("time is" + time)
                    // setLoadingBarStatus((prevStatus) => { return prevStatus > time ? prevStatus : time })


                    // delete x[key]["source"]
                    // delete x[key]["time"]

                    return "*** " + time + " " + key + " ***\n" + JSON.stringify(x[key])
                })
                // var eventTypes2 = json.map(x => {
                //     var key = Object.keys(x)[0]
                //     var time = x[key]["time"]
                //     delete x[key]["source"]
                //     delete x[key]["time"]

                //     return "*** " + time + " " + key + " ***\n" + JSON.stringify(x[key])
                // })
                const startingTasks = removeDuplicates(json.map((item) => {
                    var key = Object.keys(item)[0]
                    var time = item[key]["time"]
                    console.log("time 2 is " + time)
                    setLoadingBarStatus((prevStatus) => { return prevStatus > time ? prevStatus : time })
                    //   setLoadingBarStatus((prevStatus) => { return prevStatus > time ? prevStatus : time })
                    //    console.log("item in json is" + JSON.stringify(item) + " and key is " + key + "time is" + time)
                    if (key === "ETaskStart") {
                        console.log("task start found")
                        console.log("XHR STATUS IS" + xhr.status)
                        console.log("data " + JSON.stringify(item.ETaskStart))
                        console.log("created " + JSON.stringify(item.ETaskStart.task.created))
                        const start = item.ETaskStart.task.created + item.ETaskStart.task.minStartTime
                        const end = item.ETaskStart.task.created + item.ETaskStart.task.minStartTime + (item.ETaskStart.task.duration)
                        const itemReduced = {
                            label: item.ETaskStart.task.caseName + item.ETaskStart.task.name,
                            task: item.ETaskStart.task.name,
                            id: item.ETaskStart.task.id,
                            starting_time: start,
                            ending_time: end,
                            // delay: item.time,
                            cost: item.ETaskStart.task.cost,
                            resources: item.ETaskStart.task.resources
                            // duration: item.duration,
                            // time: item.time,
                        }
                        return itemReduced
                    }
                }))
                //setParsedResources

                console.log("starting tasks is" + JSON.stringify(startingTasks))

                setParsedItems((prevData) => {

                    const newList = [...prevData.filter(n => n), ...startingTasks.filter(n => n)]
                    const newListMinusDuplicates = newList.filter((value, index) => {
                        const _value = JSON.stringify(value);
                        return index === newList.findIndex(newList => {
                            return JSON.stringify(newList) === _value;
                        });
                    });
                    return newListMinusDuplicates
                })
                console.log("JSON IS " + JSON.stringify(json))
                // const tasks=json.map((item)=>{
                //     console.log("item is" + item.)
                // })
                setResponseText(eventTypes.join("\n"))
                // textarea.value = eventTypes.join("\n");
            } else {
                // console.log("unescaped data is "+ slashUnescape(data))
                setResponseText(slashUnescape(data))
                // textarea.value = slashUnescape(data)
            }


            // console.log("EVENT1:", JSON.stringify(event))
            // console.log("EVENT2:", event)
            // console.log("EVENT3:", event.target.response)
            // console.log("is string" + typeof (event.target.response))
            //For each task we need task start,end,duration,delay
            /**For each TaskStart event we can get task.name,task.duration,task.id,time=( and start time)*/
            console.log("Task data is" + JSON.stringify(taskData))
            console.log("parsed tasks is " + JSON.stringify(parsedItems))
        }
        xhr.send(value)
    }
    function slashUnescape(contents) {
        return contents.replace(/\\(\\|n|")/g, function (replace) {
            return replacements[replace];
        });
    }

    function isResourceImportValid() {

    }
    function isValidDistribution(parameter) {

        if (parameter === "Constant" || parameter === "Exponential" || parameter === "Uniform") { return true }
        else { return false }
    }
    function isValidUnitType(parameter) {

        if (parameter === "Nanoseconds" ||
            parameter === "Milliseconds" ||
            parameter === "Seconds" ||
            parameter === "Minutes" ||
            parameter === "Hours") { return true }
        else { return false }
    }
    function isValidResource(resourceId, resources) {


        //  console.log("r is found",resourceData.filter(item=>item.id===resourceId))

        if (resources.filter(item => item.id === resourceId).length > 0) {

            return true
        }
        else {

            return false
        }
    }
    function isValidTask(task, resources) {
        if (isValidDistribution(task.costDropdown) &&
            isValidDistribution(task.durationDropdown) &&
            isValidUnitType(task.units) &&
            (task.priorityDropdown == 1 || task.priorityDropdown == 2 || task.priorityDropdown == 3) &&
            task.resources.map((resource) => isValidResource(resource.id, resources)).every(bool => bool === true) &&
            task.resourceQuantityList.map((listItem) => isValidResource(listItem[0], resources)).every(bool => bool === true)
        ) {
            // tasks.resourceQuantityList.map((resource)=>{
            //     console.log(resource)
            // })
            console.log("is valid task")
            return true
        }
        else { return false }
    }
    function isValidOrder(order, tasks, hashes) {
        if (isValidUnitType(order.units) && isValidDistribution(order.arrivalDistribution)) {

            console.log("is valid order dropdowns")
            const removedDuplicateTasks = removeDuplicates(order.tasksRequired)
            return removedDuplicateTasks.map((t) => {

                const supposedTask = hashes.get(t.id)
                console.log("stask is", tasks.filter((t) => t.id === supposedTask.id))
                if (tasks.filter((t) => t.id === supposedTask.id).length === 1) {
                    //now check this task id is in nodes, and add 1 to a node counter
                    if (order.nodes.filter((node) => node.id == t.id).length === 1)//there exists exactly one node for this task
                    {
                        const node = order.nodes.filter((node) => node.id == t.id)[0]

                        if (node.width === 150 && node.height === 40 && node["data"]["label"] == supposedTask.name) {
                            console.log("valid node!!!")
                            return true
                        }
                        console.log("invalid parameters")
                        return false
                    }
                    else {
                        console.log("invalid order")
                        return false
                    }
                }
                else {
                    console.log("invalid order")
                    return false
                }

            }).every(bool => bool === true)
            //go through taskRequired and check they are all in tasks
            //start edge/node error checking
            return true
        }
        else { return false }
    }
    //importFromJson 
    function importFromJson(json) {
        const parsedJson = json
        const hashes = new Map()
        const keys = Object.keys(parsedJson)
        setResourceData([])
        setTaskData([])
        setOrderData([])
        const localResourceData = []
        const localTaskData = []
        const localOrderData = []
        if (keys.length === 5) {
            if (keys[0] === "resourceData" && keys[1] === "taskData" && keys[2] === "orderData"&& keys[3] === "startingTime"&& keys[4] === "orderLimit") {
                console.log("intial test passes")
                if (Array.isArray(parsedJson.resourceData) && (Array.isArray(parsedJson.taskData)) && (Array.isArray(parsedJson.orderData))) {

                    console.log("first key is", parsedJson.resourceData[0])
                    const rKeys = Object.keys(parsedJson.resourceData)
                    for (const key in rKeys) {
                        const r = parsedJson.resourceData[key]

                        if (hashes.get(r.id) === undefined) {
                            hashes.set(r.id, r)
                            //add resource
                            // setResourceData(prevData => [...prevData, {
                            //     id: r.id,
                            //     name: r.name,
                            //     cost: r.cost,
                            //     limit: r.limit,
                            //     removeResource: r.removeResource,
                            //     arrayPos: prevData.length
                            // }])
                            localResourceData.push({
                                id: r.id,
                                name: r.name,
                                cost: r.cost,
                                limit: r.limit,
                                removeResource: r.removeResource,
                                arrayPos: localResourceData.length
                            })

                        }
                        else {
                            console.log("invalid json, duplciate keys. All keys should be unique")
                        }
                    }
                    setResourceData(localResourceData)
                    const tKeys = Object.keys(parsedJson.taskData)
                    for (const key in tKeys) {
                        const t = parsedJson.taskData[key]
                        if (hashes.get(t.id) === undefined && isValidTask(t, localResourceData)) {
                            console.log("task is valid")
                            hashes.set(t.id, t)
                            localTaskData.push({
                                id: t.id,
                                name: t.name,
                                cost: t.cost,
                                durationDropdown: t.durationDropdown,
                                costDropdown: t.costDropdown,
                                priorityDropdown: t.priorityDropdown,
                                duration: t.duration,
                                resources: t.resources,
                                removeTask: false,
                                units: t.units,
                                durationEnd: t.durationEnd,
                                costEnd: t.costEnd,
                                arrayPos: localTaskData.length,
                                resourceQuantityList: t.resourceQuantityList
                            })
                            //for each task check id is unique, check duration distribution, unit type, cost distribution, and task priority are of valid types. 
                            //for each assigned resource, check it is an available/existing resource then add it else ignore it
                        }
                        else {
                            console.log("invalid json, duplciate keys. All keys should be unique")
                            //set upload json to false
                        }
                    }
                    const oKeys = Object.keys(parsedJson.orderData)
                    for (const key in oKeys) {
                        const o = parsedJson.orderData[key]
                        if (hashes.get(o) === undefined) {
                            if (isValidOrder(o, localTaskData, hashes)) {
                                console.log("now check edges")
                                const edgesSet = new Map()
                                if (o.edges.map((edge) => {
                                    if (o.nodes.filter((node) => node.id === edge.source).length > 0 && o.nodes.filter((node) => node.id === edge.target).length > 0) {
                                        if (edge.type === "buttonedge" && edgesSet.get(edge.id) === undefined) {
                                            edgesSet.set(edge.id, edge)
                                            return true
                                        }
                                        else { return false }

                                    } else { return false }
                                }).every(bool => bool === true)) {
                                    localOrderData.push(o)
                                }
                            }
                        }
                        else {
                            //cancel, error with order ids
                        }
                    }
                    setOrderData(localOrderData)
                    setTaskData(localTaskData)
                    console.log("is valid time?" +moment(parsedJson.startingTime, "YYYY-MM-DDTkk:mm", true).isValid())
                    setStartingTime(moment(parsedJson.startingTime).format("YYYY-MM-DDTkk:mm"))
                    setOrderLimit(parsedJson.orderLimit)
                    console.log("setting order limit to " + orderLimit)
                }
                else {
                    //call invalid json
                }
                //for each resource check id is unique and add to hash map


            }
            else {
                //call invalid json submission
            }
        }
        else {
            //call invalid json submission
        }
        //for each resource check id is unique
        //for each task check id is unique, check duration distribution, unit type, cost distribution, and task priority are of valid types. 
        //for each assigned resource, check it is an available/existing resource then add it else ignore it
        //For each order check id is unique, check distribution and unit rate are valid types
        //for each assigned task, check it is an available/exisitng task
        //for the edges and nodes, 
        //check each node has a unique id

    }
    function exportToJson() {
        const data = { resourceData: resourceData, taskData: taskData, orderData: orderData,startingTime:startingTime,orderLimit:orderLimit }
        const fileName = "export"
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        return
    }
    function getColorHash(tasks) {
        var colors = colormap({
            colormap: "phase",
            nshades: 64,
            format: 'hex'
        });
        var colorHash = {}
        tasks.map((prop, idx) => {
            var cidx = 0;
            if (tasks.length > 64) {
                cidx = idx % 64;
            } else if (tasks.length > 1) {
                cidx = Math.floor(idx * 63 / tasks.length);
                // we could divide by tasks.length - 1 to get to 63 exactly
                // but most colormaps are cyclic so the last color is same as/similar to the first
            } else {
                cidx = 0;
            }
            const c = colors[cidx];
            //console.log("" + prop + " : " + idx + " > " + cidx + " : " + c);
            colorHash[prop] = c;
        });
        return colorHash;//list of colors mapped to tasks
    }

    var replacements = { '\\\\': '\\', '\\n': '\n', '\\"': '"' };
    return (
        <Context.Provider value={{
            page,setPage

        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }