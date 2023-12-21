import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiHome } from "react-icons/fi";
 
function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed top-0 z-10">
      <div className="navbar-start">
        <Link to="/" as="button" className="btn btn-ghost text-xl"><FiHome /> ชื่อหมู่บ้าน 1</Link>
      </div>
      
      <div className="navbar-end">
        <Link as="button" to="/manage" className="btn btn-success text-white justify-self-end">
          Manage House
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
