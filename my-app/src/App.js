import logo from './logo.svg';
import './css/App.css'
import {Context} from "./Context"
import React, { useContext }from "react"
import { Routes, Route, Link } from "react-router-dom"
import Nav from "./Components/Nav"
import ProterForm from './Components/ProterForm';
import Flow from "./Components/flow/reactFlowTest"
function App() {

  return (
    <div className='h-screen w-screen bg-sunset1'>
       <Routes>
         <Route exact path="/" element={<ProterForm />} />
        <Route exact path="/aa" element={<h1 className='app--title'>Proter</h1>} /> 
      </Routes> 
    </div>
  );
}

export default App;
