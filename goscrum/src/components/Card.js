import React from "react";

export default function Card({data: {title, datetime, creator, description, type, priority}}) {
  return (
    <div className="relative">
      <div className="absolute right-1">X</div>
      <h3>{title}</h3>
      <h6>{datetime}</h6>
      <h5>{creator}</h5>
      <button>{type}</button>
      <button>{priority}</button>
      <p>{description}</p>
    </div>
  );
}
