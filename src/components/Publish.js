import React, { useState } from "react";
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {BiCopy} from "react-icons/bi"
  
function Publish() {
  const [link, setLink] = useState("");
  const id = generateId(); // generate a unique identifier
  
const nav = useNavigate();

  function generateId() {
    // generate a unique identifier
   
    return Math.random().toString(36).substring(2, 10);
  }

  function handleGenerateLink() {
    const newLink = `https://surveyForm.com/${id}`; 
    setLink(newLink);
    
   
  }

  function handleCopyLink(e) {
    navigator.clipboard.writeText(link); 
    e.preventDefault()
    toast("Link Copied");
  }
  const handleClick = (e)=>{
    e.preventDefault()
    nav("/showthings");
  }

  return (
    <>
    <nav className="flex flex-row bg-black p-2 items-center ">
    <h1 className="text-bold text-white bg-black w-screen text-3xl ">Publish Your Form !</h1>
    <p className="text-white hover:underline text-xl " onClick={handleClick}>Take Survey </p>
    </nav>

    <div className="flex h-screen items-center justify-center">
    
    <div className="border-4 flex flex-col justify-center border-black absolute text-center p-4 box  ">
      <p className="text-md font-semibold">Get Your Form</p>
      <br/>
      <br/>
      <button  className='px-3 py-4 text-xl  font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-blue-200 to-blue-800 md:w-auto' onClick={handleGenerateLink}>Generate Link</button>
      {link && (
        <div className="flex flex-row bg-gray-100 mt-16 h-10 text-center items-center">
          <p className=" p-2">{link}</p>
          <button className="bg-green-600 p-3 rounded-sm ml-5 text-white font-bold w-fit px-4 hover:bg-orange-800 flex flex-row items-center" onClick={handleCopyLink}> <BiCopy size={30}/> &nbsp; COPY LINK</button>
        </div>
      )}
    </div>
    </div>
    <ToastContainer/>
    </>
  );
}

export default Publish;
