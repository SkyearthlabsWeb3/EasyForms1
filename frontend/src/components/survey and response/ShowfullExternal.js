import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import { BiArrowBack, BiCopy } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";
import { FaRegFileAlt } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";

const ShowfullExternal = () => {
  const [formFields, setFormFeilds] = useState([]);
  const [heading, setHeading] = useState("");

  const location = useLocation();
  const Id = location.pathname.split("/")[2];
  const user = JSON.parse(localStorage.getItem("currUser"));

  //responses fetch and send 
//Todo:remove later
console.log("Url--", Id, location);
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
    alert("Responses has being sent successfully..");
     handleItemClick(4)
  
  };

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };
  const sendDataToBackend = async () => {
    try {
      const data = {
        heading : heading,
        formResponses :formResponses,
        questionId : Id,
         
      };
        
      console.log("data=", JSON.stringify(data));
      const response = await axios.post(
        "http://localhost:3000/sendResponse",
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

  //responses fetch and send end.







  const [selectedItem, setSelectedItem] = useState(1);


  const [finalSetOfResponse, setFinalSetOfResponse] = useState([]);
   
  const runFunction = (responses) => {
  console.log("Entered Run Function-->", responses)
    const fetchdataFilled = async(key) => {
      const data = await axios
      .get(`${key}/test1.json`)
      .then((response) => {
        console.log("Response from api ->",response.data.formResponses);

        setFinalSetOfResponse(...finalSetOfResponse, response.data.formResponses);
      })
      .catch((error) => {
        console.log(error);
      });
    };

    console.log("Responses.length ->", responses?.length);
    for (let i = 0; i < responses.length; i++) {
      
      fetchdataFilled(responses[i].key);
    }
   
  }; 

  const fetchResponses = async ()=>{
    const resp = await axios.get(`http://localhost:3000/allresponses/${Id}`);
    console.log("all responses submitted to form ", resp);
    runFunction(resp.data);
    console.log("-->", resp.data);
    }

  



  const navigationItems = [
    { id: 1, name: "form questions" },
    { id: 2, name: "Share" },
    { id: 3, name: "responses" },
  ];

  const ç = (itemId) => {
    setSelectedItem(itemId);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if(validateToken()){
      fetchD();
      fetchResponses();
      handleItemClick(1);
    }
    // fetchD();
    // fetchResponses();

    //Vipin:Todo added loaction
    // const generateLink= location.pathname;
    // const generateLink= window.location.href;
    // console.log("generateLink->", generateLink);
    // setLink(generateLink)

  }, []);

 

  const dataFetched = async (key) => {
    console.log("Key runfunction dataFetched:", key)
    const data = await axios
      .get(`${key}/test1.json`)
      .then((response) => {
        console.log("Helllo123->",response.data.fields);
        setFormFeilds(response.data.fields);
        setHeading(response.data.heading);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  const fetchD = async () => {
    const response = await axios.get(`http://localhost:3000/fetchdata/${Id}`);
    console.log("fetch ids of question : ", response);
      console.log("Data available :", response.data.key);
      dataFetched(response.data.key);
  
    
  };

  const validateToken = async () => {
    const response = await axios.get(`http://localhost:3000/validatetoken/${Id}`);
    console.log("Validate Response: ", response);
    if(response?.data?.message==="Data available exist"){
      console.log("Data available :", response.data.id);
      return true;
    }
    return false;
  };
  const [isresponse, setIsResponse] = useState(true);



  


  const handleResponse = () => {
    setIsResponse(true);
  };
  const handleShare = () => {
    setIsResponse(false);
  };

  //share link part start

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
    e.preventDefault();
    toast("Link Copied");
  }

  //share link part end

  const [visible, setVisible] = useState(true);


const handleVisible = (index)=>{
 setVisible(false);
}

const handleVisi = ()=>{
  // setVisible(
  //   {...visible,
  //   state:true,
  // index : ''}
  // )
  setVisible(true);
}

console.log("responses final:", finalSetOfResponse);

  return (
    <div className="items-center flex flex-row   justify-center">
     
      {/* side nav */}
      {/* Vipin:Commented for External users */}
      {/* <div className="sidenav hidden md:block bg-white text-black  ">
        <div
          className=" pr-10  w-full top-0 absolute pb-4 flex flex-row text-3xl p-2 mb-2"
          onClick={() => navigate("/main")}
        >
          {" "}
          EasyForms
        </div>

        <div className="flex flex-col justify-start items-start absolute top-1/3 text-lg  align-middle text-center">
          <div
            className="flex flex-row  justify-center items-center text-center hover:text-blue-900 "
            onClick={() => handleItemClick(1)}
          >
            <BsLink45Deg size={25} /> <p>Form Builder</p>
          </div>
          <div
            className="flex flex-row my-5 justify-center items-center text-center hover:text-blue-900 "
            onClick={() => handleItemClick(2)}
          >
            <FaRegFileAlt size={25} /> <p>Responses</p>{" "}
          </div>
          <div
            className="flex flex-row  justify-center items-center text-center hover:text-blue-900 "
            onClick={() => handleItemClick(3)}
          >
            <BsLink45Deg size={25} /> <p>Share</p>
          </div>
        </div>

        <div className="absolute bottom-10 items-start flex flex-col">
          <p className="p-3">Support</p>
          <p className="p-3">Request a feature</p>
          <p className="p-3">Documentation</p>
          <p className="p-3">Help</p>

          <hr className="w-full p-3" />
          <p className="p-2">email</p>
        </div>
      </div> */}
      {/* side nav end */}

      {selectedItem === 1 && (
        <div>
          <div className=" flex flex-col justify-center items-center bg-gray-50 w-screen">
            <h1 className="text-3xl font-sans font-bold mb-4 text-center">
              {heading} 
            </h1>
            <p className="mb-4 font-serif"></p>
            <form
              className=" rounded-lg p-2 md:w-1/2 w-fit items-center   justify-center"
              onSubmit={handleFormSubmit}
            >
              {formFields.map((field, index) => {
                if (field.type === "text" || field.type === "textarea" || field.type === "normal") {
                  return (
                    <div
                      key={index}
                      className="shadow p-3 min-w-screen-sm text-center round"
                    >
                      <div className="flex flex-row p-2 ">
                        <p className="mr-2">{index + 1}. </p>
                        <label className="font-bold text-xl">
                          {field.label}
                        </label>
                      </div>
                      <br />
                      {field.type === "text" || field.type === "normal"? (
                        <input
                          type="text"
                          name={field.label}
                          onChange={handleChange}
                          placeholder="Enter Your Answer"
                          className="bg-gray-100 p-2 border-2 w-full rounded-lg border-gray-300"
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
                        <label className="font-bold text-xl">
                          {field.label}
                        </label>
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
                        <label className="font-bold text-xl">
                          {field.label}
                        </label>
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

              <div className="flex justify-center items-center text-center">
                <button
            className="rounded mt-5 text-lg w-1/4 text-center   bg-slate-800 px-6 pb-2 pt-2.5  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)"
            type="submit"
          >
            Submit
          </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedItem === 2 && (
        <div className="main">
          <div className="flex flex-row justify-between my-10">
            <p className="text-4xl  font-bold ">{heading}</p>
            <button className="bg-slate-200 h-fit py-2 px-3 font-semibold">
              Download CSV
            </button>
          </div>
          <hr />

          <div className="flex flex-row text-lg  p-2 ">
            <p>Complete</p> &nbsp; &nbsp; &nbsp;
            <p>Incomplete</p>
          </div>
          <hr />

          <div className="flex flex-row p-3 ">
            {/* <p className="text-xl font-semibold ">No Responses</p> */}
            &nbsp; &nbsp;
            <p className="text-gray-400">(Last response was 4 days ago)</p>
          </div>
          
          {/* if responses would be there it would be represented like this.. */}


         

          {visible && (
            <div className="" >
              <div className="flex flex-row justify-between mb-2 bg-slate-200 p-2 font-semibold">
                {Object.entries(finalSetOfResponse).map(([question, answer], index) => (
                  <div
                    className="flex flex-row justify-between w-20 overflow-hidden"
                    key={index}
                    
                  >
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {question}
                    </div>
                  </div>
                ))}
                <div className="">Tag</div>
                <div className="">Preview</div>
              </div>
            
          {/* <div className="flex flex-col">     */}
          {/* {finalSetOfResponse &&  finalSetOfResponse.map((object, ind)=>( */}
               <div className="flex flex-row justify-between hover:bg-gray-100 p-2">
                {Object.entries(finalSetOfResponse).map(([question, answer], index) => (
                  <div
                    className="flex flex-row justify-between w-20 "
                    key={index}
                    onClick={()=>setVisible(false)}
                  >
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {answer}{" "}
                    </div>
                 
                  </div>
                ))}
                <div className="">Tag</div>
                <div className="" >Preview</div>
              {/* </div> ))} */}
              </div>

            </div>
          )}

         
          {!visible && (
            <div>
              <button onClick={()=>setVisible(true)}>
                <BiArrowBack size={25} />
              </button>
              <div className="flex flex-col ">
                {Object.entries(finalSetOfResponse).map(([question, answer], index) => (
                  <div className="flex flex-col m-3 " key={index}>
                    <div className="text-md text-slate-500 font-semibold m-1">
                      {question}
                    </div>
                    <div className="m-1">{answer}</div>
                  </div>
                ))}
              </div>{" "}
            </div>
          )}
        </div>
      )}

      {selectedItem === 3 && (
        <div className=" flex flex-col  style_class   absolute top-1/4 left-1/3 border-2 border-slate-100 p-6 text-left align-middle w-1/3">
          <div className="text-2xl font-semibold flex flex-col m-4 ">
            <p>Your form has been created 123-ShowfullExternal</p>
            <p>successfully</p>
          </div>

          <div className="text-lg font-semibold text-left m-4 mb-2 p-2">
            Share Link
          </div>
          <hr className="bg-black font-bold" />

          <div className="flex flex-col font-semibold m-4">
            <p>Start using your component by copying</p>
            <p> the web address below Showfull</p>
          </div>

          <div className="flex flex-row m-4">
            <input
              value={link}
              className="border-2 border-gray-200  p-3 w-3/4"
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
      )}

{/* Thanks Response to external user */}
{selectedItem === 4 && (
        <div>
          <div className=" flex flex-col justify-center items-center bg-gray-50 w-screen">
            <h1 className="text-3xl font-sans font-bold mb-4 text-center">
              {heading} 
            </h1>
            <p className="mb-4 font-serif">
            </p>
          
            <hr className="bg-black font-bold" />

<div className="flex flex-col font-semibold m-4">
  <p>Thanks for completing this form!</p>
  
</div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ShowfullExternal;
