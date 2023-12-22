import React, { useState, useEffect } from "react";
import axios from "axios";

function ModalAdd({ handleClose, fetchData }) {
  const [value, setValue] = useState({
    house_number: "",
    village_id: "",
    hc_serailno: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`https://fibaroalarmapi.onrender.com/housestatus`, value)
      .then((res) => {
        alert(`Add House ${res.data.house_number} Success!`);

        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });

    e.target.reset();
    /* console.log(value); */
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center text-black">
        <button
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-3xl text-slate-600">Add House</h3>
        <form className="mt-5" onSubmit={handleSubmit}>
          {/* House_number */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">House_number</span>
            </div>
            <input
              type="text"
              name="house_number"
              placeholder="House_number"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </label>

          {/* Village_id */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Village_id</span>
            </div>
            <input
              type="text"
              name="village_id"
              placeholder="Village_id"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </label>

          {/* HC_serailno */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">HC_serailno</span>
            </div>
            <input
              type="text"
              name="hc_serailno"
              placeholder="HC_serailno"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
          </label>

          <button
            className="mt-5 btn btn-primary w-full max-w-xs uppercase"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalAdd;
