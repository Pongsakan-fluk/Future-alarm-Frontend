import React, { useState, useEffect } from "react";
import { FiHome } from "react-icons/fi";

function Card({ id, house_num, status, alarm }) {
  return (
    <div
      className={`card w-full h-40 text-white border-2 
      ${ alarm ? "bg-red-500 border-lime-700" : "bg-green-500 border-lime-700" }`}
    >
      <div className="card-body items-center text-center">
        <FiHome size={28} />
        <h1 className="card-title text-xl">บ้าน : {house_num}</h1>
        <p>สถานะ : {status}</p>
        {/* <div className="card-actions justify-center">
          <button className="btn btn-error">Delete</button>
        </div> */}
      </div>
    </div>
  );
}

export default Card;
