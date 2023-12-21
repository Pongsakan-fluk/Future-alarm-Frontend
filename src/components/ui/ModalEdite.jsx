import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ModalEdite({ handleClose }) {
  let { id } = useParams();

  const [data, setData] = useState();
  /* const [value, setValue] = useState({
    house_number: "",
    village_id: "",
    hc_serailno: "",
  }); */

  const fetchData = () => {
    axios
      .get(`https://fibaroalarmapi.onrender.com/housestatus/id/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://fibaroalarmapi.onrender.com/housestatus/${id}`, data)
      .then((res) => {
        alert(`Update House ${res.data.house_number} Success!`);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* console.log(data); */

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box text-center text-black">
        <button
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-3xl text-slate-600">Edite House</h3>
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
              value={data?.house_number || ""}
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
              value={data?.village_id || ""}
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
              value={data?.hc_serailno || ""}
              onChange={handleChange}
            />
          </label>

          <button
            className="mt-5 btn btn-primary w-full max-w-xs uppercase"
            type="submit"
            /* onClick={handleSubmit} */
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalEdite;
