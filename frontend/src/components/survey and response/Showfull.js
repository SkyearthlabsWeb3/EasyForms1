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

const Showfull = () => {
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
        console.log("Field- type: ", responses[field.label], responses[field.type]  )
        responses[field.label] = formData.get(field.label);
      }
    });

    setFormResponses(responses);

    sendDataToBackend();
    alert("Responses has being sent successfully..");
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

  const [responsesHeader,setResponseHead] = useState({});
  const [finalSetOfResponse, setFinalSetOfResponse] = useState([]);
   
  const runFunctionOld = (responses) => {
  console.log("Entered Run Function-->", responses)
    const fetchdataFilled = async(key) => {
      console.log("Key runfunction:", key)
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

    // console.log("Responses.length ->", responses?.length);
    for (let i = 0; i < responses.length; i++) {
      
      fetchdataFilled(responses[i].key);
    }
    console.log("FinalResponse Old-->> ", finalSetOfResponse);
   
  }; 

// Vipin
  const runFunction = async (responses) => {
    // console.log("Entered Run Function Vip-->", responses)
    let keyList= [];
     
      // console.log("Responses.length ->", responses?.length);
      for (let i = 0; i < responses.length; i++) 
      keyList.push( `${responses[i].key}/test1.json`)
      
      console.log("---> KeyList ", keyList)
  
      
       Promise.all(keyList.map(async idx=> await fetch(idx))).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          // return response.json();
          console.log("Responses123 :", response)
          return response.json();
        }));
      }).then(function (data) {

       console.log("data ::", data);
        let temp=[]
        data?.map(e=> {

          if(typeof e!==undefined){
            let arr= Object.values(e.formResponses)[0];
            console.log("Arr112: ",arr, arr!==undefined)
            // if(typeof arr!=="undefined"){
              console.log("Arr11: ",arr)
              temp.push(arr);
            // }
          }
        })  
        console.log(" data ABC ", temp);
         setFinalSetOfResponse(...finalSetOfResponse,temp)
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
      console.log("finalSetOfResponse ->", finalSetOfResponse);
      // setFinalSetOfResponse( customResponse);
     
    }; 
            const fetchResponses = async ()=>{
    const resp = await axios.get(`http://localhost:3000/allresponses/${Id}`);
    console.log("all responses submitted to form ", resp);
    runFunction(resp.data);
    // runFunctionVipin(resp.data);
    console.log("finalSetOfResponse fetchresp ->", finalSetOfResponse);
    }

  



  const navigationItems = [
    { id: 1, name: "form questions" },
    { id: 2, name: "Share" },
    { id: 3, name: "responses" },
  ];

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  const navigate = useNavigate();
  useEffect(() => {
    
    fetchD();
    fetchResponses();

    //Vipin:Todo added loaction
    const generateLink= `localhost:3001/showfullexternal/${Id}`;
    //const generateLink= window.location.href;
    console.log("generateLink->", generateLink);
    setLink(generateLink)

  }, []);

 

  const dataFetched = async (key) => {
    console.log("Key run function dataFetched:", key)
    const data = await axios
      .get(`${key}/test1.json`)
      .then((response) => {
        console.log("Response Data Fields::", response.data.fields);
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

    dataFetched(response.data.key);
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
    console.log("Copying....");
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
    
      <div className="sidenav hidden md:block bg-white text-black  ">
        <div
          className=" pr-10  w-full top-0 absolute pb-4 flex flex-row text-3xl p-2 mb-2"
          onClick={() => navigate("/main")}
        >
          {" "}
          SurveyQuill
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
      </div>
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
                if (field.type === "text" || field.type === "textarea") {
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
                      {field.type === "text" ? (
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


                      {/* {field.options.map((option, optionIndex) => (
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
                      ))} */}
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
              Download PDF
            </button>
          </div>
          <hr />

          <div className="flex flex-row text-lg  p-2 ">
            <p>Complete</p> &nbsp; &nbsp; &nbsp;
            <p></p>
          </div>
          <hr />

          <div className="flex flex-row p-3 ">
            {/* <p className="text-xl font-semibold ">No Responses</p> */}
            &nbsp; &nbsp;
            <p className="text-gray-400"></p>
          </div>
          
          {/* if responses would be there it would be represented like this.. */}


         

          {visible && (
            <div className="" >
              <div className="flex flex-row justify-between mb-2 bg-slate-200 p-2 font-semibold">
                {/* Vipin: Fixed */}
               {formFields.map((field, index) =>
                  <div
                  className="flex flex-row justify-between w-20 overflow-hidden"
                  key={index}
                  
                >
                  {/* <div className="overflow-hidden overflow-ellipsis whitespace-nowrap"> */}
                  <div className="overflow-hidden whitespace-nowrap">
                  {field.label}
                  </div>
                </div>
                  
                  )
               }
              
                {/* {Object.keys(finalSetOfResponse).map((question, index) => (
                  <div
                    className="flex flex-row justify-between w-20 overflow-hidden"
                    key={index}
                    
                  >
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                     {question}
                    </div>
                  </div>
                ))} */}
                <div className="">Tag</div>
                <div className="">Preview</div>
              </div>
            
          {/* <div className="flex flex-col">     */}
          {/* {finalSetOfResponse &&  finalSetOfResponse.map((object, ind)=>( */}
          
          <div className="flex flex-row justify-between hover:bg-gray-100 p-2">
                {console.log("UI--> ", finalSetOfResponse)}
                {/* {Object.entries(finalSetOfResponse).map(([question, answer], index) => ( */}
                {finalSetOfResponse?.map((response, index)=>( 
                  
                  <div
                    className="flex flex-row justify-between w-20 "
                    key={index}
                    onClick={()=>setVisible(false)}
                  >
                    <div className="overflow-hidden whitespace-nowrap"> 
                     123 {response}{" "}
                    </div>
                   
                  </div>
                ))}
                <div className="">Tag</div>
                     <div className="" >Preview</div>
                  </div>
              {/* </div> ))} */}
             

            </div>
          )}

         
          {!visible && (
            <div>
              <button onClick={()=>setVisible(true)}>
                <BiArrowBack size={25} />
              </button>
              <div className="flex flex-col ">
                testing..
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
            <p>Your form has been created</p>
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

      <ToastContainer />
    </div>
  );
};

export default Showfull;

//   <div className="flex h-screen items-center justify-center">
//   <div className="border-2 flex flex-col justify-center border-black absolute text-center p-4   ">
//     <p className="text-md font-semibold">Get Your Form</p>
//     <br />
//     <br />
//     <button
//       className="px-3 py-4 text-xl  font-semibold text-center text-white transition duration-300 rounded-lg  ease bg-slate-800 hover:bg-slate-600 md:w-auto"
//       onClick={handleGenerateLink}
//     >
//       Generate Link
//     </button>
//     {link && (
//       <div className="flex flex-row bg-gray-100 mt-16 h-10 text-center items-center">
//         <p className=" p-2">{link}</p>
//         <button
//           className="bg-slate-500 p-3 rounded-sm ml-5 text-white font-bold w-fit px-4 hover:bg-gray-800 flex flex-row items-center"
//           onClick={handleCopyLink}
//         >
//           {" "}
//           <BiCopy size={30} /> &nbsp;
//         </button>
//       </div>
//     )}
//   </div>
// </div>
