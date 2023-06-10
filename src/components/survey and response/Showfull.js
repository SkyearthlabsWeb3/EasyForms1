import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './styles.css';

const Showfull = () => {
   const [formFields, setFormFeilds] = useState([]);
  const [heading, setHeading] =useState("");

   useEffect(() => {
     console.log("I am in use effectt");
     fetchD();
  },[]);

  const location = useLocation();
  const Id = location.pathname.split("/")[2];

     const dataFetched = async (key)=>{
    const data = await axios.get(`${key}/test1.json`).
    then(response =>{
      console.log(response.data.formResponses);
      setFormFeilds(response.data.formResponses);
      setHeading(response.data.heading);
    }).catch(error =>{
      console.log(error)
    }) }

  


const fetchD = async()=>{
  const response = await axios.get(`http://localhost:3000/fetchdata/${Id}`);
  console.log("response : ", response);
  dataFetched(response.data.key);
}



  return (
    <div className='items-center flex flex-row   justify-center'>
      
        
{/* side nav */}

<div className="sidenav hidden md:block bg-white text-black  ">
            <div className=" pr-10  w-full top-0 absolute pb-4 flex flex-row text-3xl p-2 mb-2">
              {" "}
              surveyForms{" "}
            </div>

            <div className="absolute bottom-10 items-start flex flex-col">
              <p className="p-3">Support</p>
              <p className="p-3">Request a feature</p>
              <p className="p-3">Documentation</p>
              <p className="p-3">Help</p>

              <hr className="w-full p-3" />
              <p className="p-2">email</p>
            </div>
          </div>
{/* side nav end */}

<div className='main'>

  {  heading &&  <p className='text-4xl mb-4 font-semibold'>{heading}</p>}
  
      {Object.entries(formFields).map(([question, answer], index) => (
        <div key={index} className="mb-4">
          <p className="text-lg font-bold mb-1">{question}</p>
          <p className="bg-gray-100 px-4 py-2 rounded-md">{answer}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Showfull