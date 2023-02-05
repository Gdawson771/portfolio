
import React, { useContext } from "react"

import { Context } from "../../Context"
export default function Arrival() {


    const { arrivalData, setArrivalData } = useContext(Context)


    function handleChange(event) {
        setArrivalData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }))
    }

    return (<div className="task--container w-min px-4 py-2 ">
        <form className="flex gap-2 flex-wrap">
            <input
                type="checkbox"
                id="infinteArrivals"
                checked={arrivalData.infinteArrivals}
                onChange={(event) => handleChange(event)}
                name="infinteArrivals"
            />
            <label htmlFor="infinteArrivals" className="text-aeroMint">Infinte Arrivals?</label>
            <select name="arrivalRate" onChange={(event) => handleChange(event)} value={arrivalData.arrivalRate}>
                <option value="Constant" >Constant</option>
                <option value="Exp">Exponetial</option>
                <option value="Uniform">Uniform</option>
            </select>
            <input
                className="Proter--Task--Duration"
                type="text"
                placeholder="Duration"
                onChange={(event) => handleChange(event)}
                name="duration"
                value={arrivalData.duration}
            />  
            {arrivalData.arrivalRate === "U" && <input

                type="text"
                placeholder="End of the range"
                onChange={(event) => handleChange(event)}
                name="durationEnd"
                value={arrivalData.durationEnd}
            />}
        </form>
    </div>)

}