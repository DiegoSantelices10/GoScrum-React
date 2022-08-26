import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";



export default function Card({deleteCard, editCardStatus, data, data: {_id, title, createdAt, user: { userName }, description, status, importance}}) {
  
const datetime = new Date(createdAt).toLocaleString() + " hs."

  return (
    <div className="w-full md:w-full md:relative  mx-auto my-3 px-4 md:px-1 ">
    <div className="bg-slate-800 p-3 rounded-md  text-sm">
      <button className="absolute right-7 md:right-3" onClick={() => deleteCard(_id)}>
      <FiTrash2 className="text-red-600" size={20}/>
      </button>
      <h3 className="text-base text-white font-bold uppercase">{title}</h3>
      <h5 className="font-medium text-white">{userName}</h5>
      <h6 className="font-normal mb-2 text-white">{datetime }</h6>

      <div className="flex items-center justify-between">
        <button className={`${importance === "LOW" ? 
              "bg-yellow-500 text-xs font-semibold text-white p-1 w-1/2 rounded-xl  hover:bg-red-400 transition-colors" : 
              importance === "MEDIUM" ? "bg-orange-500 text-xs font-semibold text-white p-1 w-1/2 rounded-xl  hover:bg-red-400 transition-colors" :
              "bg-red-600 text-xs font-semibold text-white p-1 w-1/2 rounded-xl  hover:bg-red-400 transition-colors" }`}>
                {importance}</button>
              <button className="absolute right-6 md:right-2 text-xs font-semibold text-white"
                  onClick={() => editCardStatus(data)}><FiChevronsRight className="text-red-600" size={30}/>
              </button>
      </div>
      
      
      <p className="font-medium w-3/4 text-white mt-2">{description}</p>
    </div>
  </div>
  );
}

