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
import { ToastContainer, toast } from "react-toastify";
//import { GoDiffAdded } from "react-icons/go";
import { MdRemoveCircle } from "react-icons/md";
import { FaRegCircle, FaRegFileAlt } from "react-icons/fa";
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
  BsLink45Deg,
  BsTextareaT,
} from "react-icons/bs";
import { AiFillFileText } from "react-icons/ai";

const CreateForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [formIdSaved,SetFormIdSaved] = useState("");
  

  const [selectedItem, setSelectedItem] = useState(1);

  const navigationItems = [
    { id: 1, name: "builder" },
    { id: 2, name: "Share" },
  ];

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  const user = JSON.parse(localStorage.getItem("currUser"));
  

  const [heading, setHeading] = useState("");

  const handleHeading = (event) => {
    setHeading(event.target.value);
  };
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


    sendDataToBackend(storedData);

    // console.log(storedData);
    alert("Your form has been saved..");
  };

  const sendDataToBackend = async () => {
    try {
      const data = {
        heading: heading,
        fields: formFields,
        userId : user.userId
      };

      console.log("data=", JSON.stringify(data));
      const response = await axios.post(
        "http://localhost:3000/createForm",
        data
      );
      if(response.status===200) {
        
        let newformid= response.data?.generateFormId;
        let newformidurl=  `localhost:3001/showfullexternal/${newformid}`;
        SetFormIdSaved(newformidurl)
      }
      
      console.log("Created Form with id:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleCopyLink(e) {
  
    const input = document.getElementById('externalURL');
    input.select();
    document.execCommand('copy');
    toast("Link Copied");
  }
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
        {/* sidenav start  */}
        <div className="sidenav hidden md:block bg-white text-black  ">
          <div
            className=" pr-10  w-full top-0 absolute pb-4 flex flex-row text-3xl p-2 mb-2"
            onClick={() => navigate("/main")}
          >
            {" "}
            SurveyQuill{" "}
          </div>

          {/* start */}
          <div className="flex flex-col justify-start items-start absolute top-1/3 text-lg  align-middle text-center">
            <div
              className="flex flex-row my-5 justify-center items-center text-center hover:text-blue-900 "
              onClick={() => handleItemClick(1)}
            >
              <FaRegFileAlt size={25} /> <p>Builder </p>{" "}
            </div>
            <div
              className="flex flex-row  justify-center items-center text-center hover:text-blue-900 "
              onClick={() => handleItemClick(2)}
            >
              <BsLink45Deg size={25} /> <p>Share</p>
            </div>
          </div>
          {/* end */}

          <div className="absolute bottom-10 items-start flex flex-col">
            <p className="p-3">Support</p>
            <p className="p-3">Request a feature</p>
            <p className="p-3">Documentation</p>
            <p className="p-3">Help</p>

            <hr className="w-full p-3" />
            <p className="p-2">{user.email}</p>
          </div>
        </div>
        {/* sidenav end */}

        {selectedItem === 2 && (
          <div className=" w-screen md:mx-20 main ">
            <div className=" flex flex-col  style_class  w-screen  md:w-1/2 md:ml-64  absolute top-1/4  border-2 border-black text-left align-middle ">
              <div className="text-2xl font-semibold flex flex-col m-4 ">
                <p>Your Form has been created </p>
                <p>successfully</p>
              </div>

              <div className="text-lg font-semibold text-left m-4 mb-2 p-2">
                Share Link
              </div>
              <hr className="bg-black font-bold" />

              <div className="flex flex-col font-semibold m-4">
                
              </div>

              <div className="flex flex-row m-4">
                <input
                  className="border-2 border-gray-200  p-3 w-3/4"
                  value={formIdSaved}
                  id="externalURL"
                />
                <button
              className="bg-slate-700 text-white h-full p-3 hover:bg-gray-500 ml-2 px-4 rounded-md"
              onClick={handleCopyLink}
            >
              Copy
            </button>
              </div>

              <div className="underline font-bold m-4 ">
                Preview Link in a new tab
              </div>
            </div>
          </div>
        )}

        {/* create Form start */}

        {selectedItem === 1 && (
          <div className="flex flex-col pr-10 main sm:w-screen   ml-0 md:ml-64  ">
            <div className="flex flex-row justify-end items-end  bg-white text-slate-800  text-center align-middle fixed right-0 md:pr-10 p-2 w-full top-0 ">
              {/* <BsFillBellFill size={35} className="mx-2" /> */}
              <CgProfile size={35} className="mx-2" />
              <h1 className="text-xl mx-2">{user.email}</h1>
            </div>

            <div>
              <div className="bg-white w-full top-14  text-black h-fit text-center fixed right-10 pr-10 p-2 flex flex-row justify-center items-end     ">
                <input
                  placeholder="Enter Form Heading"
                  className="text-4xl font-bold p-4 md:w-1/2 sm:w-1/3 md:mr-10 outline-none focus:bg-gray-200 active:bg-gray-200 hover:bg-gray-200 mx-64 rounded-md "
                  onChange={handleHeading}
                  value={heading}
                />
                <button
                  onClick={handleAddField}
                  className=" rounded bg-slate-800 px-6 pb-2  pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-slate-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:absolute   right-7 md:mx-10  lg:mx-10 flex flex-row"
                >
                  {" "}
                  <BiAddToQueue size={20} /> &nbsp;
                  <p> Add </p>
                </button>
              </div>

              <br />
              <br />

              <div className="md:ml-40 ">
                {formFields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    ref={newElementRef}
                    className=" text-center my-10 shadow drop_shadow p-5  w-10/12   rounded-xl  h-fit   "
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
                          className="mr-2  text-sm focus:text-slate-700"
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
                        className=" pl-2 border-2 border-gray-200 rounded-md focus:outline-slate-700  w-3/4 p-2"
                      />
                      <select
                        name="type"
                        value={field.type}
                        onChange={(e) => handleFieldChange(fieldIndex, e)}
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
                                className="border-2 border-gray-200 w-3/4 p-3  rounded-lg mb-3 focus:outline-slate-700"
                                onChange={(e) =>
                                  handleOptionChange(fieldIndex, optionIndex, e)
                                }
                              />

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
                            className="rounded bg-slate-200  px-6 pb-2 pt-2.5 text-xs  uppercase leading-normal text-slate-700 font-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-100 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-100 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-slate-100 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mt-2 inline-flex justify-start items-start w-fit"
                          >
                
                            <p>Add Option</p>{" "}
                          </button>
                        </div>
                      </div>
                    ) : null}

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

              <div className="inline-flex  bg-white w-full bottom-10 fixed right-14 my-5">
                {formFields.length > 0 && (
                  <div className="absolute right-3 bg-white">
                    <button className="border-2 border-slate-800   rounded-md   font-bold px-9 py-2 mx-2 mb-2">
                      Cancel
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="bg-slate-800  rounded-md  text-white    font-bold px-9 py-2 mx-2 mb-2"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* create form end */}
      </div>
    </div>
  );
};

export default CreateForm;
