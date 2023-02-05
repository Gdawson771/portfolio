import React, { useContext } from "react"
import { Context } from "../../Context"

import "../../css/Tasks.css"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SpaSharp } from "@material-ui/icons";

export default function Tasks() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    //Proter
    //Dispicer
    //Go on chain
    //Drone flight path control algorithm
    // export default function ProjectSpice() {
    //     return (
    //         <div>
    //             <h2 className="ProjectSpice--h2">Alexa activated spice machine</h2>
    //             <div className="ProjectSpice--mainDiv">


    //               
    //                 <p>The Dispicer is a voice activated, alexa integrated, automatic spice dispensing and grinding machine my team made
    //                     as one of our final projects.
    //                 </p>
    //             </div>
    //         </div>)
    return (
        <div className="tasks--mainDiv mt-16">
            <div className="flex flex-col bg-sunset2 rounded md:p-16 text-white lg:w-1/3 w-4/5 p-8">
                <span className="text-xl">
                    Proter
                </span>
                <span >
                    A discrete event simulator for modelling complex workflows. Fully tested and evaluated front-end will be made publically available after July.
                    The workflowFM code base and Proter API which serves as the backend can be found here: <a className="text-sunset4" href="https://github.com/workflowfm">https://github.com/workflowfm</a>
                </span>
            </div>
            <div className="flex flex-col bg-sunset2 rounded p-16 text-white lg:w-1/3 w-4/5 p-8 gap-4">
                <span className="text-xl">
                    Dispicer
                </span>
                <span >
                    A fully automated Alexa integrated automatic spice dispenser. This was a team project and was incredibly fun. I was in charge of creating the Alexa bot with AWS and integrating the functions which operate the motors with the Flask server.
                    We learned that hooking up the front and back end is easier said than done.

                </span>
                <img className="ProjectSpice--dispicerPoster" src={require("./imgs/SpicePoster.png")} alt="spiceDispenserPoster" />
                <img className="ProjectSpice--dispicerDevice" src={require("./imgs/SpiceDevice.jpg")} alt="spiceDispenserDevice" />
            </div>
            <div className="flex flex-col bg-sunset2 rounded p-16 text-white lg:w-1/3 w-4/5 p-8">
                <span className="text-xl">
                    Drone driver
                </span>
                <span >
                    An optimisation algorithm for an uber-eats style drone which creates the highest possible profit route between as many customers and restaurants as it can. Implemented the A* algorithm.
                    The red zones are no-fly areas and the challenge of the project was to create a solution to a travelling salesman type problem.
                </span>
                <img className="ProjectSpice--dispicerDevice" src={require("./imgs/ILPFlightPath.jpg")} alt="ILP" />
            </div>
            <div className="flex flex-col bg-sunset2 rounded p-16 text-white lg:w-1/3 w-4/5 p-8">
                <span className="text-xl">
                    Go in Ethereum
                </span>
                <span >
                    Go is a game where when you place any piece, a breadth-first search must be conducted at every move to check if any piece/group has been captured. My partner and I designed a system which utilise off-chain bots who
                    observe the Go game as it progresses to create a very low gas solution which doesn't compromise on security.
                </span>
            </div>

        </div>
        )
}