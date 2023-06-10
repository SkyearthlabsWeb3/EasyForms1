import React from 'react'
import { Link } from 'react-router-dom';

const Responses = () => {
  

const users = [
 {
  id: 1,
  user: 'joe',

 },
 {
  id: 2,
  user: 'john',

 },
 {
  id: 3,
  user: 'max',

 }

]
  return (
    <>
    <div className='flex flex-col justify-center items-center text-center'>
      <nav className='bg-black p-2 w-screen text-white'>
    
    <h1 className='text-center font-bold text-3xl '>Responses by users</h1>
        
    </nav>
    <br/>
    <div className="grid grid-cols-2 gap-1 p-1 text-center w-1/2 ">
       <div className="bg-gray-200 p-4 font-bold text-2xl">User Name</div>
       <div className="bg-gray-100 p-4 font-bold text-2xl" >Responses</div>
   </div>
    {users.map((u)=>{
      return(
    <div className="grid grid-cols-2 gap-1 p-1 text-center w-1/2 ">
       <div className="bg-gray-200 p-4 font-semibold">{u.user}</div>
       <div className="bg-gray-100 p-4 underline text-blue-600 hover:text-pink-600" ><Link to={`/showfull/${u.id}`}>View Response</Link> </div>
   </div> )
    })}
        </div>

    </>
  )
}

export default Responses