import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";



export default function Card({deleteCard, editCardStatus, data, data: {_id, title, createdAt, user: { userName }, description, status, importance}}) {
  
const datetime = new Date(createdAt).toLocaleString() + " hs."

  return (
    <div className="relative w-full md:w-full  mx-auto my-3 px-4 md:px-1">
    <div className="bg-white p-3 rounded-md border text-sm">
      <button className="absolute right-7" onClick={() => deleteCard(_id)}>
      <FiTrash2 className="text-red-600" size={20}/>
      </button>
      <h3 className="text-base font-semibold">{title}</h3>
      <h5 className="font-medium text-slate-600">{userName}</h5>
      <h6 className="font-medium mb-2">{datetime }</h6>
      <div className="flex">
        <button className={`${importance === "LOW" ? 
              "bg-yellow-500 text-xs font-semibold text-white p-1 w-1/2 rounded-xl  hover:bg-red-400 transition-colors" : 
              importance === "MEDIUM" ? "bg-orange-500 text-xs font-semibold text-white p-1 w-1/2 rounded-xl  hover:bg-red-400 transition-colors" :
              "bg-red-600 text-xs font-semibold text-white p-1 w-1/2 rounded-xl  hover:bg-red-400 transition-colors" }`}>
                {importance}</button>
        <button className="absolute right-7 text-xs font-semibold text-white"
              onClick={() => editCardStatus(data)}><span className="text-red-600">{status}</span><FiChevronsRight className="text-red-600" size={30}/></button>
      </div>
      
      
      <p className="font-medium w-3/4">{description}</p>
    </div>
  </div>
  );
}

