import React, { useContext, useState, useEffect } from "react"
import useHover from "../../hooks/useHover"
import { Context } from "../../Context"
import { nanoid } from "nanoid"
import Tippy from '@tippyjs/react';
import { FormHelperText } from '@mui/material';
import 'tippy.js/dist/tippy.css'; // optional for styling

// import { HelperText, TextInput } from 'react-native-paper';
import "../../css/Resources.css"
export default function Resource(props) {

    const { handleResourceChange, removeResource } = useContext(Context)
    const [hovered, ref] = useHover()
    const [effectFlag, setEffectFlag] = React.useState(false)
    const [data, setData] = React.useState({ id: props.id, name: props.name, cost: props.cost, arrayPos: props.arrayPos, limit: props.limit,removeResource:props.removeResource })
    const iconClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"
    const binColor = hovered ? "text-red-600" : "text-white"


    React.useEffect(() => {

        setData({ id: props.id, name: props.name, cost: props.cost, arrayPos: props.arrayPos, limit: props.limit,removeResource:props.removeResource })
    }, [props])


    function handleChange(event) {

        console.log("in handleChange props id is " + props.id + " and data.id is" + data.id)
        setData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }))
        setEffectFlag(true)
    }
    React.useEffect(() => {

        setEffectFlag(false)

        handleResourceChange(data)

    }, [effectFlag])

    function handleResourceRemoval() {

        console.log("in resource removal props id is " + props.id + " and data.id is" + data.id)

        /**TODO data.id here is different to props.id find out when and how the difference occurs */
        removeResource(props.id)
    }
    function isNumeric(n) {
        if (n == null) {
            console.log("is null" + n)
            return true
        }
        return (!isNaN(parseFloat(n)) && isFinite(n) && parseFloat(n) > 0) || n.length == 0;
    }


    return (
        <div className="resource--container" id={props.id}>

            {<form className="resource--form flex gap-2">
                <div className="h-24">
                    <Tippy content={<span>A unique name assigned to this resource</span>}>
                        <div className="flex flex-col h-20">
                            <label for="Name">Resource Name</label>
                            <input
                                className="resource--name"
                                type="text"
                                id="Name"
                                placeholder="New resource name"
                                onChange={(event) => handleChange(event)}
                                name="name"
                                value={props.name}
                            />
                        </div>
                    </Tippy>
                </div>
                <div className="h-24">
                    <Tippy content={<span>The cost for using this resource</span>}>
                        <div className="flex flex-col h-20">
                            <label for="cost">Resource Cost</label>
                            <input
                                className="resource--cost "
                                type="text"
                                id="cost"
                                placeholder="New resource cost"
                                onChange={(event) => handleChange(event)}
                                name="cost"
                                value={props.cost}
                            />
                            <span className="text-errorRed text-xs font-medium">
                                {!isNumeric(props.cost) && "Must be a positive decimal number"}
                            </span>

                        </div>
                    </Tippy>
                </div>
                <Tippy content={<span>The amount of this resource which is available</span>}>
                    <div className="flex flex-col h-24">
                        <label for="limit">Resource Limit</label>
                        <input
                            className="resource--cost "
                            type="text"
                            id="limit"
                            placeholder="New resource limit"
                            onChange={(event) => handleChange(event)}
                            name="limit"
                            value={props.limit}
                        />
                        <span className="text-errorRed text-xs font-medium">
                            {!isNumeric(props.limit) && "Must be a positive decimal number"}
                        </span>

                    </div>
                </Tippy>
            </form>
            }  <div className={binColor}>
                <Tippy content={<span>Remove resource</span>}>
                    <i
                        className={iconClassName}
                        onClick={() => props.handleOpen(props)}
                        // onClick={() => handleResourceRemoval()}
                        ref={ref}
                    >
                    </i>
                </Tippy>
            </div>
            <input
                        type="checkbox"
                        id="removeResource"
                        name="removeResource"
                        checked={props.removeResource}
                        onChange={(event) => handleChange(event)} />
        </div >
    )
}
/*
Resource.defaultProps = {
  id:"err",
   name:"",
   cost:""
}
*/