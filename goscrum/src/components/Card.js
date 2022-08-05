import React from "react";

export default function Card({deleteCard, editCardStatus, data, data: {_id, title, createdAt, user: { userName }, description, status, importance}}) {
  return (
    <div className="relative w-full md:w-72 mx-auto my-5 ">
    <div className="bg-white p-3 rounded-md shadow-md border text-sm">
      <div className="absolute right-3" onClick={() => deleteCard(_id)}>X</div>
      <h3 className="text-base font-bold">{title}</h3>
      <h5 className="font-semibold">{userName}</h5>
      <h6 className="font-medium mb-2">{createdAt}</h6>
      <button className="bg-red-500 text-xs font-semibold text-white 
                           p-1 w-24 rounded  hover:bg-red-400 transition-colors"
              onClick={() => editCardStatus(data)}>{status}</button>
      <button className="bg-red-500 text-xs font-semibold text-white p-1 w-24 rounded ml-1 hover:bg-red-400 transition-colors">{importance}</button>
      <p className="font-medium">{description}</p>
    </div>
  </div>
  );
}

