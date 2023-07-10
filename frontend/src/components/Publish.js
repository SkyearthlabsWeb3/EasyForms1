import React, { useState } from "react";
import "./styles.css";
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import { useEffect } from "react";

function Publish() {
  const [link, setLink] = useState("");
  const id = generateId(); // generate a unique identifier

  const nav = useNavigate();

  function generateId() {
    // generate a unique identifier

    return Math.random().toString(36).substring(2, 10);
  }

  useEffect(() => {
    handleGenerateLink();
  }, []);

  function handleGenerateLink() {
    const newLink = `https://EasyForm.com/${id}`;

    console.log("New Link->", newLink);
    setLink(newLink);
  }

  function handleCopyLink(e) {
    navigator.clipboard.writeText(link);
    console.log(" Link->", link);
    e.preventDefault();
    //toast("Link Copied");
  }
  const handleClick = (e) => {
    e.preventDefault();
    nav("/showthings");
  };

  return (
    <>
    <div>
      <h1>Share Link</h1>
      <p>Your form is now published and ready to be shared with the world!</p>
      <input type="text" id="myText" placeholder="Enter text here" />
      <button onClick={handleCopyLink}>Copy</button>
    </div>
    </>
  );
}

export default Publish;
