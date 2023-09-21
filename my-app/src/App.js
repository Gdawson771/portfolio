import './css/App.css'
import React from "react"
import { Routes, Route } from "react-router-dom"
import ProterForm from './Components/ProterForm';
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
