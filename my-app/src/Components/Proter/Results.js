

import React, { useContext } from "react"
import timeline2 from "../vis/timeline"
import "../../css/Tasks.css"
import vis from "vis-data";
import Timeline from 'react-visjs-timeline'
//import Timeline from 'react-visjs-timeline'
import { Context } from "../../Context"
import { elementAcceptingRef } from "@mui/utils"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling

export default function Results() {
    const [localResults, setLocalResults] = React.useState()
    const [localTaskGroups, setLocalTaskGroups] =React.useState()
    const [localTaskItems, setLocalTaskItems] =React.useState()
    const [localResourceGroups, setLocalResourceGroups] =React.useState()
    const [localResourceItems, setLocalResourceItems] =React.useState()
    const { Submit,

        timeLineTaskGroups,
        setPage,
        timeLineTaskItems,
        responseText,
        timeLineResourceGroups, timeLineResourceItems,

        timeLineOptions,
        loadingbarLimit,
        loadingbarStatus } = useContext(Context)
    React.useEffect(()=>{
        //setRItems
        setLocalResourceItems(timeLineResourceItems)
    },[timeLineResourceItems])
    React.useEffect(()=>{
        //setRItems
        setLocalResourceGroups(timeLineResourceGroups)
    },[timeLineResourceGroups])
    React.useEffect(()=>{
        //setRItems
        setLocalTaskItems(timeLineTaskItems)
    },[timeLineTaskItems])
    React.useEffect(()=>{
        //setRItems
        setLocalTaskGroups(timeLineTaskGroups)
    },[timeLineTaskGroups])
    //    const [localResults, setLocalResults] = React.useState()

    React.useEffect(() => {
        setLocalResults(responseText)
        console.log(" timeLine info is" + JSON.stringify(timeLineTaskItems))
        console.log(" resource info is" + JSON.stringify(timeLineResourceItems))
    }, [responseText])

    function loadingBar(status, limit) {

        // const percent2=Math.floor(status*12/limit)+"/12"
        const percent = Math.floor(status * 100 / limit) + "%"
        return (
            <div className="h-16 w-full bg-gray-900 rounded">
                <div className={"h-full  !bg-blue-300 rounded text-right duration-300 ease-linear transition-all flex justify-end "} style={{ width: percent }}>
                    {/* <div className={"h-full !w-"+Math.floor(status*12/limit) +"/12 bg-blue-500 rounded text-right " }> */}
                    <span className="p-5 text-white font-bold " >{`${status * 100 / limit}%`}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="tasks--mainDiv">

            <button onClick={() => { setPage("Submission") }} className="tasks--button">Go back to Submission</button>

            <div className="w-4/5">
                {loadingBar(loadingbarStatus, loadingbarLimit)}
            </div>
            <div className=" bg-white w-4/5">
                {<Timeline
                    options={timeLineOptions}
                    items={localTaskItems}
                    groups={localTaskGroups}
                />}
            </div>
            <div className=" bg-white w-4/5">
                {<Timeline
                    options={timeLineOptions}
                    items={localResourceItems}
                    groups={localResourceGroups}
                />}
            </div>
            {/* <div className=" bg-white w-4/5">
                {timeLineTaskGroups && timeLineTaskItems && <Timeline
                    options={timeLineOptions}
                    items={timeLineTaskItems}
                    groups={timeLineTaskGroups}
                />}
            </div>
            <div className=" bg-white w-4/5">
                {timeLineResourceItems && timeLineResourceGroups && <Timeline
                    options={timeLineOptions}
                    items={timeLineResourceItems}
                    groups={timeLineResourceGroups}
                />}
            </div> */}
            <textarea name="response" id="response" className="w-2/3 text-black" value={localResults}></textarea>
        </div>)

}
