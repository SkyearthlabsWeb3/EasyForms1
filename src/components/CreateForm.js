import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
// import
import {
  AiFillDelete,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";

import { GoDiffAdded } from "react-icons/go";
import { MdRemoveCircle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons//rx";
import { IoMdDoneAll } from "react-icons/io";
import { BiCopy } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { CiTextAlignLeft } from "react-icons/ci";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { GrCopy } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import {
  BsCardText,
  BsFillBellFill,
  BsLayoutTextWindowReverse,
  BsTextareaT,
} from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";

const CreateForm = () => {
  const [formFields, setFormFields] = useState([]);

  const [ heading, setHeading] = useState("");

  const handleHeading = (event)=>{
    setHeading(event.target.value);
  }
  const newElementRef = useRef(null);
  //  console.log(formFields.length);

  // up

  const moveQuestionUp = (index) => {
    if (index > 0) {
      const updatedQuestions = [...formFields];
      const temp = updatedQuestions[index - 1];
      updatedQuestions[index - 1] = updatedQuestions[index];
      updatedQuestions[index] = temp;
      setFormFields(updatedQuestions);
    }
  };

  const moveQuestionDown = (index) => {
    if (index < formFields.length - 1) {
      const updatedQuestions = [...formFields];
      const temp = updatedQuestions[index + 1];
      updatedQuestions[index + 1] = updatedQuestions[index];
      updatedQuestions[index] = temp;
      setFormFields(updatedQuestions);
    }
  };

  //down

  const navigate = useNavigate();

  const handleFieldChange = (index, event) => {
    const newFormFields = [...formFields];
    newFormFields[index][event.target.name] = event.target.value;
    setFormFields(newFormFields);
  };

  const handleCheckboxChange = (index) => {
    const newFormFields = [...formFields];
    newFormFields[index].required = !newFormFields[index].required;
    setFormFields(newFormFields);
  };

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { label: "", type: "normal", options: [], required: false },
    ]);

    if (newElementRef.current) {
      newElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRemoveField = (index) => {
    const newFormFields = [...formFields];
    newFormFields.splice(index, 1);
    setFormFields(newFormFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, event) => {
    const newFormFields = [...formFields];
    newFormFields[fieldIndex].options[optionIndex] = event.target.value;
    setFormFields(newFormFields);
  };

  const handleAddOption = (index) => {
    const newFormFields = [...formFields];
    newFormFields[index].options.push("");
    setFormFields(newFormFields);
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const newFormFields = [...formFields];
    newFormFields[fieldIndex].options.splice(optionIndex, 1);
    setFormFields(newFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      heading: heading,
      fields: formFields,
    };

    localStorage.setItem("formFields", JSON.stringify(formData));
    const storedData = JSON.parse(localStorage.getItem("formFields"));
    console.log(storedData);
    // const value = JSON.stringify(storedData);

    postData(storedData);

    // console.log(storedData);
    navigate("/success");
  };

  const postData = async (value) => {
    // try {
    //   console.log(value);
    //   const response =
    //    await axios.post('http://localhost:3000/createForm', value);
    //   // console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const user = JSON.parse(localStorage.getItem('currUser'));

  return (
    <div className=" text-center ">
      <nav className="flex flex-col  p-3 fixed w-screen">
        {/* <div className="bg-white text-black">
       

        <button
          onClick={handleAddField}
          className=" rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  lg:absolute md:absolute right-36 md:mx-10 lg:mx-10 flex flex-row"
        >
          {" "}
          <BiAddToQueue size={20} /> &nbsp;
          <p> Add Question </p>
        </button>

        {formFields.length && (
          <button
            onClick={handleSubmit}
            className="rounded-full bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] absolute right-16  "
          >
            Submit
          </button>
        )}
        </div> */}
      </nav>


      <div className="flex flex-row pt-20   ">
        <div className="sidenav hidden md:block bg-white text-black  ">
          <div className="bg-slate-800  pr-10 p-9 w-full top-0 absolute pb-4 "></div>
          <div className="flex flex-row mt-10 justify-between ">
            <AiFillFileText size={30} color="gray" />
            <BsLayoutTextWindowReverse size={30} color="gray" />
            <BsTextareaT size={30} color="gray" />
          </div>
          <hr className="mt-2" />
          <div className="flex flex-col justify-start items-start pl-4">
            <h1 className="font-semibold text-gray-500 text-xl my-2">Sample</h1>
            <div className="flex flex-row my-2 text-gray-500 ">
              <GrCopy size={25} className="mr-2" color="gray" />
              <p>United</p>
            </div>
            <div className="flex flex-row my-2 text-gray-500">
              <GrCopy size={25} className="mr-2" color="gray" />
              <p>United 2</p>
            </div>
            <div className="flex flex-row my-2 text-gray-500">
              <GrCopy size={25} className="mr-2" color="gray" />
              <p>Survey Form</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col pr-10 main w-screen md:w-screen ml-0 md:ml-64  ">
          <div className="flex flex-row justify-end items-end  bg-slate-800 text-white  text-center align-middle fixed right-0 pr-10 p-2 w-full top-0 ">
            <BsFillBellFill size={35} className="mx-2" />
            <CgProfile size={35} className="mx-2" />
            <h1 className="text-xl mx-2">{user.email}</h1>
          </div>
          
          <div>

          <div className="bg-white w-full top-14 text-black h-fit text-center fixed right-10 pr-10 p-2 flex flex-row justify-center items-end   ">
            <input 
              placeholder="Enter Heading"
              className=" text-3xl font-semibold outline-none border-b-2 border-black mx-64 "
              onChange={handleHeading}
              value={heading}
            />
            <button
              onClick={handleAddField}
              className=" rounded bg-slate-800 px-6 pb-2  pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]   right-36 md:mx-10 lg:mx-10 flex flex-row"
            >
              {" "}
              <BiAddToQueue size={20} /> &nbsp;
              <p> Add </p>
            </button>

            {formFields.length > 0 && (
              <button
                onClick={handleSubmit}
                className="rounded-full bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]  right-16  "
              >
                Submit
              </button>
            )}
          </div>

          <br />
          <br />

          {formFields.map((field, fieldIndex) => (
            <div
              key={fieldIndex}
              ref={newElementRef}
              className=" text-center my-10 shadow drop_shadow p-5 rounded-xl w-full h-fit   "
            >
              <div className=" justify-center items-center text-center flex flex-row ">
                <p className="w-3/4">Question {fieldIndex + 1}</p>
                <div className=" ">
                  <button
                    className="mr-2 text-sm focus:text-blue-700 "
                    onClick={() => moveQuestionUp(fieldIndex)}
                    disabled={fieldIndex === 0}
                  >
                    <AiOutlineArrowUp color="gray" size={20} />
                  </button>
                  <button
                    className="mr-2  text-sm focus:text-blue-700"
                    onClick={() => moveQuestionDown(fieldIndex)}
                    disabled={fieldIndex === formFields.length - 1}
                  >
                    <AiOutlineArrowDown color="gray" size={20} />
                  </button>
                </div>
              </div>

              <br />
              <div className="flex flex-row justify-center ">
                <AiOutlineMenu size={30} className="mr-2" />
                <input
                  type="text"
                  name="label"
                  placeholder="Enter Question"
                  value={field.label}
                  onChange={(e) => handleFieldChange(fieldIndex, e)}
                  className=" pl-2 border-2 border-gray-200 rounded-md focus:outline-blue-700  w-3/4 p-2"
                />
                <select
                  name="type"
                  value={field.type}
                  onChange={(e) => handleFieldChange(fieldIndex, e)}
                  // className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                  className="text-gray-600 bg-slate-100 ml-4  "
                >
                  <option value="normal" className="text-gray-700">
                    Select Question type
                  </option>
                  <option value="text">Text</option>
                  <option value="textarea"> Textarea</option>
                  <option value="select"> Select</option>
                  <option value="checkbox"> Checkbox</option>
                </select>{" "}
              </div>

              <br />
              {field.type === "select" || field.type === "checkbox" ? (
                <div>
                  <p className="uppercase text-gray-500 text-start mx-20 font-semibold">
                    options
                  </p>
                  <div className="flex flex-col mx-20">
                    {field.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex flex-row text-center items-center  "
                      >
                        <FaRegCircle
                          size={25}
                          className="text-center mr-2"
                          color="gray"
                        />
                        <RxDragHandleDots2
                          size={25}
                          className="text-center mr-2"
                          color="gray"
                        />
                        <input
                          type="text"
                          placeholder={`Add Option ${optionIndex + 1}`}
                          value={option}
                          className="border-2 border-gray-200 w-3/4 p-3  rounded-lg mb-3 focus:outline-blue-700"
                          onChange={(e) =>
                            handleOptionChange(fieldIndex, optionIndex, e)
                          }
                        />
                        <div className="mx-4 flex flex-row text-center justify-center items-center">
                          {" "}
                          <input
                            type="checkbox"
                            name="required"
                            checked={field.required}
                            className="border-2 border-gray-300 form-checkbox text-green-600   h-5 w-5"
                            onChange={() => handleCheckboxChange(fieldIndex)}
                          />
                          <label className="ml-2 text-lg flex flex-row ">
                            <p>Require</p> <p className="ml-2"> Explainition</p>
                          </label>
                        </div>
                        <button
                          className="m-4"
                          onClick={() =>
                            handleRemoveOption(fieldIndex, optionIndex)
                          }
                        >
                          <RxCross1 color="gray" size={25} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddOption(fieldIndex)}
                      className="rounded bg-blue-200  px-6 pb-2 pt-2.5 text-xs  uppercase leading-normal text-blue-700 font-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-100 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-100 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-100 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mt-2 inline-flex justify-start items-start w-fit"
                    >
                      <GoDiffAdded size={20} className="mr-2" />{" "}
                      <p>Add Option</p>{" "}
                    </button>
                  </div>
                </div>
              ) : null}
              {/* <input
            type="checkbox"
            name="required"
            checked={field.required}
            className="border-2 border-gray-300"
            onChange={() => handleCheckboxChange(fieldIndex)}
          />
          <label>Required</label> */}
              <br />
              <div className="flex justify-end ">
                <button className="m-4">
                  <BiCopy color="gray" size={30} />
                </button>
                <button
                  className="m-4 "
                  onClick={() => handleRemoveField(fieldIndex)}
                >
                  <AiFillDelete color="gray" size={30} />
                </button>
                <button className="rounded-xl bg-slate-800  px-6 h-fit  pb-2 pt-2.5 text-xs  uppercase leading-normal text-white font-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-slate-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mt-2 inline-flex justify-start items-start w-fit">
                  <IoMdDoneAll size={20} />
                  <p className="ml-2">Done</p>{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      {/* {formFields.length && <button onClick={handleSubmit} className='rounded-full bg-green-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] ml-5'>Submit</button>} */}
    </div>
  );
};

export default CreateForm;
