import Home from "./Proter/Home"
import Projects from "./Proter/Projects"
import Orders from "./Proter/About"
import Submission from "./Proter/Submission"
import React, { useContext } from "react"
import { Context } from "../Context"
import "../css/ProterForm.css"
import MultiStepProgressBar from "./MultiStepProgressBar/MultiStepProgressBar";

export default function ProterForm() {
 
    const {page, setPage} =useContext(Context)
    const nextPage = (page) => {
        setPage(page);
    };
    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
            case "Home":
                setPage("Home");
                break;
            case "Projects":
                setPage("Projects");
                break;
            case "About":
                setPage("About");
                break;
            case "Contact":
               // alert("Ooops! Seems like you did not fill the form.");
                setPage("Contact");
                break;
            
            default:
                setPage("Home");
        }
    };
    //const { edgesToFlow, Submit } = useContext(Context)
    // const [displayFlow, setDisplayFlow] = React.useState(false)

    return (
        <div className="flex flex-col pt-10 h-screen w-screen">
            <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
            {
            {
                Home: <Home setPage={setPage}/>,
                Projects: <Projects setPage={setPage}    />,
                About: <Orders setPage={setPage}  />,
                Contact: <Submission setPage={setPage}  />,
                
            }[page]
            }
            

        </div>

    )
}