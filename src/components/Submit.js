import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <h1 className="text-6xl font-bold text-white mb-8">Success!</h1>
      <p className="text-xl text-white">
        Your Response Submitted SuccessFully!
      </p>
      <br />
      <p className="text-xl text-white font-mono">
        Your will redirected in 5 seconds.
      </p>
    </div>
  );
};

export default Submit;
