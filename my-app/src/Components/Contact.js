import React from "react"
import { useNavigate } from "react-router-dom";

export default function Contact() {

    let navigate = useNavigate();
    const [formData, setFormData] = React.useState(
        { email: "", text: "" }
    )

    const [emailSent, setEmailSent] = React.useState(false)
    function handleChange(event) {

        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }
    function submitEmail() {
        navigate('/')

    }
    function submitData(event) {

        setEmailSent(true)

        const body = JSON.stringify({
            senderName: "gdawson771@gmail.com",
            senderEmail: "gdawson771@gmail.com",
            message: formData.email + formData.text,
            date: new Date(),
            fileName: "Test_File_Name"
        })
        event.preventDefault();
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
            })

    }
    return (
        <div>

            <form className="Form">
            
                <input
                    className="Form--email"
                    type="text"
                    placeholder="Email"
                    onChange={(event) => handleChange(event)}
                    name="email"
                    value={formData.email}
                />

                <textarea
                    className="Form--text"
                    value={formData.text}
                    placeholder="your message goes here"
                    onChange={(event) => handleChange(event)}
                    name="text" />

                <button className="Form--btn" onClick={(event) => submitData(event)}>Send</button>
                {emailSent && <div className="Form--confirmSubmit">
                    +                <section >
                        +                        <p>Message Sent! Thanks!</p>
                        +
                        +                    <h5>Email: {formData.email}</h5>
                        +                    <h5>Message: {formData.text}</h5>
                        +
                        +
                        +                </section>
                    +
                    +                   <button className="Form--btn" onClick={submitEmail} >Confirm</button>
                    +
                    +                </div>}
            </form>
        </div>
    )
}
