import React from "react";

import "./App.css";
import Full from "./components/Full";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateForm from "./components/CreateForm";
import ShowThings from "./components/ShowThings";
import Sucess from "./components/Sucess";
import Publish from "./components/Publish";
import Submit from "./components/Submit";


import Responses from "./components/survey and response/Responses";
import Survey from "./components/survey and response/Survey";
import Showfull from "./components/survey and response/Showfull";





 function App() {
 

  return (
  
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Full />} />
      <Route exact path="/survey" element={<CreateForm />} />
      <Route exact path="/showthings" element={<ShowThings/>} />
      <Route exact path="/success" element={<Sucess/>}/>
      <Route exact path="/publish" element={<Publish/>}/>
      <Route exact path="/submit" element={<Submit/>}/>
      <Route exact path="/main" element={<Survey/>} />
      <Route exact path="/responses" element={<Responses/>} />
      <Route path="/showfull/:id" element={<Showfull />}/>
    </Routes>
    </BrowserRouter>
   
  );
}
export default App;