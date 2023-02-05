
import {Link} from "react-router-dom"

import "../css/Nav.css"
export default function Nav(props) {
  console.log(props.bgColor)
  //"flex fixed justify-between h-16 w-screen items-center p-8 "+props.bgColor
    return (//
        <div  className={"nav--container "+props.bgColor}>
            
                {/* {  <div>
                        <a href="/" className="nav--logo">GD</a>
                    </div>} */}
               
                <div id="mainListDiv" >
                    <ul>
                        <li><Link to="/app" className="nav--button">Launch App</Link></li>
                       
                    </ul>
                </div>
              
              
         
        </div>
    )
}