import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillFileText, AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { BsLayoutTextWindowReverse, BsTextareaT } from "react-icons/bs";
import { GrCopy } from "react-icons/gr";
import { IoCreateOutline } from "react-icons/io5";
// import {GrView} from "react-icons/gr"
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const Survey = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("currUser"));

  const location = useLocation();
  const fetchdata = async () => {
    const response = await axios
      .get(`http://localhost:3000/uploads/${user?.userId}`)
      .then((response) => setBlogs(response.data))
      .catch((err) => {
        console.log(err);
      });

    // console.log("all uploadIds : ", response);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // console.log(blogs);
  const navigate = useNavigate();
  const handleclick = (e) => {
    e.preventDefault();
    navigate("/survey");
  };
  const toresponse = (e) => {
    e.preventDefault();
    navigate("/responses");
  };

  useEffect(() => {
    fetchdata();
  }, []);

  

  // console.log("Curr user : ", JSON.parse(localStorage.getItem('currUser')));

  const [isHoveredItemId, setIsHoveredItemId] = useState(null);

  const handleMouseEnter = (itemId) => {
    setIsHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setIsHoveredItemId(null);
  };
  const handleDelete = async (id) => {
    // e.preventDefault();
    console.log(id);
    try {
      await axios
        .delete(`http://localhost:3000/delete/${id}`)
        .then(() => console.log("deleted successfully"))
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

    window.location.reload();
  };

  const handleView = (Id) => {
    navigate(`/showfull/${Id}`);
  };
  return (
    <>
      <div className=" text-center ">
        <nav className="flex flex-row  p-3 fixed w-screen">
          <h1 className="text-3xl font-bold hidden lg:block md:block text-white">
            Active Surveys
          </h1>

          <button
            onClick={handleclick}
            className=" rounded bg-slate-800 text-lg px-10  py-5 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-slate-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-slate-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-slate-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  lg:absolute md:absolute right-28 flex flex-row"
          >
            {" "}
            {/* <IoCreateOutline size={20} /> &nbsp; */}
            <p> Create Survey</p>
          </button>
        </nav>

        <div className="flex flex-row pt-20">
          <div className="sidenav hidden md:block bg-white text-black  ">
            <div
              className=" pr-10  w-full top-0 absolute pb-4 flex flex-row text-3xl p-2 mb-2"
              onClick={() => navigate("/main")}
            >
              {" "}
              SurveyQuill{" "}
            </div>

            <div className="absolute bottom-10 items-start flex flex-col">
              <p className="p-3">Support</p>
              <p className="p-3">Request a feature</p>
              <p className="p-3">Documentation</p>
              <p className="p-3">Help</p>

              <hr className="w-full p-3" />
              <div className="flex flex-row justify-center items-center text-center">
                <p className="p-2">{user?.email}</p>

                <div className="relative inline-block flex flex-col">
                  <button
                    className=" text-gray-700 rounded inline-flex w-fit  items-center"
                    onClick={toggleDropdown}
                  >
                    {/* <span>{selectedOption || 'Select an option'}</span> */}
                    <svg
                      className="fill-current h-4 w-4 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12l-6-6h12l-6 6z" />
                    </svg>
                  </button>
                  {isOpen && (
                    <button
                      className="bg-white font-semibold p-2 "
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid main px-10 grid-cols-1 md:grid-cols-4 gap-7 md:ml-64    my-10">
            {blogs.map((blog) => (
              <div
                onMouseEnter={() => handleMouseEnter(blog.id)}
                onMouseLeave={handleMouseLeave}
                key={blog._id}
                className="bg-gray-100 h-56 mb-2 btn shadow-[0_9px_0_rgb(0,0,0)] relative  hover:shadow-[0_4px_0px_rgb(0,0,0)] text-gray-700 ease-out hover:translate-y-1 transition-all rounded"

                // style={{
                //   backgroundImage: `url("https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                //   backgroundSize: "cover",
                //   backgroundRepeat: "no-repeat",
                //   backgroundPosition: "center",
                //   height: "300px",
                // }}
              >
                <div className="flex flex-col mt-7 justify-between text-black  relative opacity-100  items-center  ">
                  <br />
                  <h1 className="font-bold  mb-4 text-3xl">{blog.heading}</h1>
                  <button
                    className="bg-slate-500 w-fit h-fit p-4 mb-2 rounded-xl text-white font-semibold hover:bg-slate-800"
                    onClick={() => handleView(blog.id)}
                  >
                    View More
                  </button>
                </div>
                {isHoveredItemId === blog.id && (
                  <div className="flex flex-row text-center justify-center mt-2 ">
                    <AiFillEye size={30} className="mx-2" />
                    <BiCopy size={30} className="mx-2" />
                    <AiFillDelete
                      size={30}
                      className="mx-2"
                      onClick={() => handleDelete(blog._id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div>
          <h1>Active Surveys</h1>
          <br />
          <div className="grid px-10 grid-cols-1 md:grid-cols-3 gap-12  my-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-blue-200 h-56 btn shadow-[0_9px_0_rgb(0,0,0)] relative  hover:shadow-[0_4px_0px_rgb(0,0,0)] text-gray-700 ease-out hover:translate-y-1 transition-all rounded"
                style={{
                  backgroundImage: `url("https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "300px",
                }}
              >
                <div className="flex flex-col pt-20 text-black  relative opacity-100  items-center justify-center ">
                  <button className="rounded bg-blue-700 text-white text-center relative p-2 font-semibold hover:bg-blue-400">
                    <Link to={`/showfull/${blog.id}`}>View Response</Link>
                  </button>
                  <br />
                  <h1 className="font-bold   text-3xl">Survey</h1>
                </div>
              </div>
            ))}
          </div>
        </div> */}
    </>
  );
};

export default Survey;
