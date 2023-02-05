
import React, { useContext } from "react"
import timeline2 from "../vis/timeline"
import "../../css/Tasks.css"
import vis from "vis-data";
import Timeline from 'react-visjs-timeline'
//import Timeline from 'react-visjs-timeline'
import { Context } from "../../Context"
import { elementAcceptingRef } from "@mui/utils"
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
export default function Submission() {

    const [emailSent, setEmailSent] = React.useState(false)
    const [formData, setFormData] = React.useState(
        { email: "", text: "" }
    )
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleClose = () => setOpen(false);
    function handleChange(event) {
        setFormData(prevFormData => {
            return { ...prevFormData, [event.target.name]: event.target.value }
        })
    }
    function handleOpen() {
        setOpen(true)
    }
    function handleSubmit() {
        setOpen(false)
        submitData()

    }
    function submitData() {

        setEmailSent(true)

        const body = JSON.stringify({
            senderName: "gdawson771@gmail.com",
            senderEmail: "gdawson771@gmail.com",
            message: formData.email + formData.text,
            date: new Date(),
            fileName: "Test_File_Name"
        })
       // event.preventDefault();
        console.log(emailSent)

        fetch("https://w5jn79ev5c.execute-api.eu-west-2.amazonaws.com/sendEmail",
            {
                method: "POST",
                mode: "no-cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: body
            }).then(data => {
                console.log("DONE")// Do some stuff here
                console.log(data)
            })
            .catch(err => {
                console.log("error on fetch")
                // Catch and display errors
            })


    }
    const [open, setOpen] = React.useState(false);
    return (<div className="tasks--mainDiv">
       {!emailSent && <div>

            <button className="tasks--button !m-0 mr-10 " onClick={() => handleOpen()}>Send me an email</button>

            {<Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="w-full h-4/6 flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-8">
                        <Tippy content={<span>Your email address</span>}>
                            <label className="text-3xl text-center " for="name">Email address</label>
                        </Tippy>
                        <Tippy content={<span>Your email address</span>}>
                            <input

                                className="task--dropdown w-full border-gray-900 border"
                                type="text"
                                id="email"
                                placeholder="foobar@do.do..."
                                onChange={(event) => handleChange(event)}
                                name="email"
                                value={formData.email}
                            />
                        </Tippy>
                    </div>
                    <div className="w-full flex flex-col gap-8 h-3/5">
                        <Tippy content={<span>Your message</span>}>
                            <label className="text-xl text-center " for="text">Message</label>
                        </Tippy>
                        <Tippy content={<span>Your message</span>}>
                            <textarea style={{ resize: "none" }} rows="20" cols="50" className="task--dropdown w-full border-gray-900 border"

                                id="text"
                                placeholder="Hello Gareth..."
                                onChange={(event) => handleChange(event)}
                                name="text"
                                value={formData.text}>

                            </textarea>

                        </Tippy>
                    </div>

                    <Button onClick={() => handleSubmit()}>Send email</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </Box>
            </Modal>}
        </div>}
        {emailSent &&    <h1 className='app--title text-white md:text-6xl text-4xl'>Thanks for the email!</h1>}
    </div>
    )
}