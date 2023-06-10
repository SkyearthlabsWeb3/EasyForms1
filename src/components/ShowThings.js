import React from "react";
import "./styles.css";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ShowThings = () => {
  const form = JSON.parse(localStorage.getItem("formFields"));
  const formFields = form.fields;
  const heading = form.heading;


  // const [formValues, setFormValues] = useState({});

  const navigate = useNavigate();

  const [formResponses, setFormResponses] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const responses = {};

    formFields.forEach((field) => {
      if (field.type === "checkbox") {
        const checkedOptions = Array.from(formData.getAll(field.label));
        responses[field.label] = checkedOptions;
      } else {
        responses[field.label] = formData.get(field.label);
      }
    });

    setFormResponses(responses);

    sendDataToBackend();
    navigate("/submit");
  };

  const sendDataToBackend = async () => {
    try {
      const data = {
        heading : heading,
        formResponses :formResponses};
        
      console.log("data=", JSON.stringify(data));
      const response = await axios.post(
        "http://localhost:3000/createForm",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      const isChecked = checked;

      setFormResponses((prevResponses) => ({
        ...prevResponses,
        [name]: isChecked
          ? [...(prevResponses[name] || []), value]
          : prevResponses[name].filter((item) => item !== value),
      }));
    } else {
      setFormResponses((prevResponses) => ({
        ...prevResponses,
        [name]: value,
      }));
    }
  };

  //   const dataFetched = async ()=>{
  //     const data = await axios.get('https://bafybeia4g3o3yndaawpkyyax67l22tqu2ih2eass5hlpzbujsffudydgby.ipfs.sphn.link/test1.json').
  //     then(response =>{
  //       console.log(response.data);
  //     }).catch(error =>{
  //       console.log(error)
  //     }) }

  //     dataFetched();

  // console.log(formResponses);

  // const fetchD = async()=>{
  // const response = await axios.get('http://localhost:3000')
  // }

  // function handleChange(event) {
  //   const { name, value, type, checked } = event.target;

  //   const newValue = type === 'checkbox' ? name : value;
  //   setFormValues(prevValues => ({
  //     ...prevValues,
  //     [name]: newValue
  //   }));
  // }

  //  const [responses, setResponses] = useState([])

  // const notify = () => toast("SuccessFully Submitted !!");
  //

  //   const handleSub = ()=>{
  //     console.log(formValues);
  //     navigate("/submit");
  //   }

  // const dataFetched = async ()=>{
  //   const data = await axios.get('https://bafybeia4g3o3yndaawpkyyax67l22tqu2ih2eass5hlpzbujsffudydgby.ipfs.sphn.link/test1.json').then(response =>{
  //     console.log(response.data);
  //   }).catch(error =>{
  //     console.log(error)
  //   })
  //  const a = await fetch('https://bafybeia4g3o3yndaawpkyyax67l22tqu2ih2eass5hlpzbujsffudydgby.ipfs.sphn.link/test1.json')
  //  const data = await a.json();
  // //  console.log(data);
  //    }
  //

  return (
    <>
      <div>
        <div className="w-screen font-bold text-3xl text-white bg-blue-600 p-4 text-center">
          Your Vote Counts !
        </div>
        <div className=" flex flex-col justify-center items-center bg-gray-50 w-screen">
          <h1 className="text-3xl font-sans font-bold mb-4 text-center">
            Survey Form
          </h1>
          <p className="mb-4 font-serif">
            Number Of Questions : {formFields.length}
          </p>
          <form
            className=" rounded-lg p-2 md:w-1/2 w-fit items-center   justify-center"
            onSubmit={handleFormSubmit}
          >
            {formFields.map((field, index) => {
              if (field.type === "text" || field.type === "textarea") {
                return (
                  <div
                    key={index}
                    className="shadow p-3 min-w-screen-sm text-center round"
                  >
                    <div className="flex flex-row p-2 ">
                      <p className="mr-2">{index + 1}. </p>
                      <label className="font-bold text-xl">{field.label}</label>
                    </div>
                    <br />
                    {field.type === "text" ? (
                      <input
                        type="text"
                        name={field.label}
                        onChange={handleChange}
                        placeholder="Enter Your Answer"
                        className="bg-gray-100 mt-5 border-2 w-full rounded-sm border-gray-300"
                      />
                    ) : (
                      <textarea
                        name={field.label}
                        onChange={handleChange}
                        placeholder="Write Your Answer"
                        rows={5}
                        cols={75}
                        // className="bg-gray-100 mt-2 mx-2 rounded-sm w-full border-2 border-gray-300"
                        className="appearance-none bg-gray-200 border w-full border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 resize-none"
                      />
                    )}
                  </div>
                );
              } else if (field.type === "select") {
                return (
                  <div key={index} className="shadow p-9 rounded-xl">
                    <div className="flex flex-row p-2">
                      <p className="mr-2">{index + 1}. </p>
                      <label className="font-bold text-xl">{field.label}</label>
                    </div>
                    {/* <select name={field.label} 
                    onChange={handleChange}
                    >
                      {field.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option} name={option}>
                          {option}
                        </option>
                      ))}
                    </select> */}
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="radio"
                          name={field.label}
                          value={option}
                          onChange={handleChange}
                          className="form-radio text-indigo-600 h-4 w-4"
                        />
                        <label className="mx-2">{option}</label>
                      </div>
                    ))}
                  </div>
                );
              } else if (field.type === "checkbox") {
                return (
                  <div key={index} className="shadow my-10 p-9 rounded-xl">
                    <div className="flex flex-row p-2">
                      <p className="mr-2">{index + 1}. </p>
                      <label className="font-bold text-xl">{field.label}</label>
                    </div>
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="checkbox"
                          name={field.label}
                          value={option}
                          onChange={handleChange}
                          className="form-checkbox text-indigo-600 h-4 w-4"
                        />
                        <label className="mx-2">{option}</label>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}

            <button
              className="rounded mt-5 text-lg w-full  bg-blue-500 px-6 pb-2 pt-2.5  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShowThings;
