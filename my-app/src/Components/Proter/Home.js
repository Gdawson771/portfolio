import React, { useRef, useContext } from "react"
import Resource from "./Resource"
import "../../css/Resources.css"
import { Context } from "../../Context"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function Home() {

    //  const {} =useContext(Context)


    return (
        <div className="resources--mainDiv text-9xl h-2/3">
            <h1 className='app--title text-white md:text-8xl text-6xl'>Hi, I'm Gareth</h1>
        </div>
    )
}