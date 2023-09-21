
import React from "react"
import "../../css/Tasks.css"

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
                console.log("DONE")
                console.log(data)
            })
            .catch(err => {
                console.log("error on fetch")
            })


    }
    const [open, setOpen] = React.useState(false);
    return (<div className="tasks--mainDiv">
        <div class="bg-darkSlateBlue p-6 rounded-lg mb-6 lg:w-2/3 text-white">
            <div class="bg-sunset1 md:p-5 p-2 mb-5 rounded-lg">
                <h2 class="text-sunset5 text-lg mb-4">Error 404</h2>
                <p class="mb-4">
                    I implemented AWS Lambda functions, utilizing AWS's mail service, to enable users of my portfolio site to email me directly. It functioned as expected, and I was quite pleased with it. However, after some time and after working on various other projects, I recognized potential flaws in my approach. The button, which you'll find below (now disabled), facilitated sending emails via AWS to my personal email. Unfortunately, there was no rate limiter in place, and the absence of a backend made it merely a fetch request to an AWS Lambda function. This oversight created a risk of incurring substantial costs from AWS, especially if someone maliciously spammed the service.
                </p>

                <p class="mb-4">
                    Ideally, I should implement a rate-limited TRPC-based API similar to what I've done for Plutocrater. However, guided by the philosophy of the "cult of done" and keen to finalize my portfolio website swiftly, I've opted to disable the email button for now, prioritizing security and cost control.
                </p>

                <p class="mb-4">
                    For inquiries or to reach out, please email me at <a href="mailto:gdawson771@gmail.com" class="text-pink-500 hover:underline">gdawson771@gmail.com</a>. Alternatively, drop me a tweet on <a href="https://plutocrater.garethdawson.dev" class="text-pink-500 hover:underline">Plutocrater</a> (sign-in via GitHub required).
                </p>
            </div>
        </div>


        {!emailSent && <div>

            <button disabled className="tasks--button !m-0 mr-10 !bg-gray-400 !cursor-not-allowed hover:!bg-gray-400 focus:!bg-gray-400" onClick={() => handleOpen()}>Send me an email</button>


        
        </div>}

    </div>
    )
}