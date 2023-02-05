import React, { useContext } from "react"
import { Context } from "../../Context"


export default function Orders() {

    const { addOrderSlot, orderData, page, setPage, removeOrder } = useContext(Context)
    const [localOrders, setLocalOrders] = React.useState()
    const [open, setOpen] = React.useState(false);

    const [orderRemoveData, setOrderRemoveData] = React.useState();
    const handleClose = () => setOpen(false);
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

    return (
        <div className="tasks--mainDiv">
            <div className="tasks--mainDiv">
                <div className="flex flex-col bg-sunset2 rounded md:p-16 text-2xl text-white lg:w-1/3 gap-8 w-4/5 p-8">

                    <span>
                        As a final year student studying computer science and artificial intelligence,
                        I have developed a passion for front-end engineering, React.js, Vue.js, solidity,
                        cryptocurrency, blockchain development, and programming. With my strong technical
                        abilities and drive to constantly improve, I am confident in my ability to excel
                        in a fast-paced and innovative environment.
                    </span>
                    <span>

                        I am seeking a role at a startup where I can apply my skills and knowledge to
                        impactful projects, and where I can be proud of the company I work for. I believe
                        that my passion for the field, in addition to my commitment to delivering high-quality work, makes
                        me an ideal candidate for a position in this industry.
                    </span>
                    <span>
                        I am eager to bring my enthusiasm and skills to a dynamic and motivated team,
                        and I am confident that I can make a valuable contribution to any organization.
                        I am excited about the opportunity to continue learning and growing as a professional.
                    </span>
                </div>
            </div>
        </div>)
}