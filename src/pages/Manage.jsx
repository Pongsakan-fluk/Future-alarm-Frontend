import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import ModalCreate from "../components/ui/ModalCreate";
import ModalEdite from "../components/ui/ModalEdite";

function Manage() {
  const [data, setData] = useState([]);
  /* For modal */
  const [create, setCreate] = useState(false);
  const [edite, setEdite] = useState(false);

  const navigate = useNavigate();



  const fetchData = () => {
    axios
      .get(`https://fibaroalarmapi.onrender.com/housestatus/top100`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* console.log(data); */

  const handleCreate = () => {
    setCreate(true);
  };

  const handleEdite = (id) => {
    navigate(`/manage/${id}`);
    setEdite(true);
  };

  const handleClose = () => {
    setCreate(false);
    setEdite(false);
  };

  const handleRemove = (id, number) => {
    if (window.confirm(`Are you sure delete House ${number}!`)) {
      axios
        .delete(`https://fibaroalarmapi.onrender.com/housestatus/${id}`)
        .then((res) => {
          alert(`Remove House ${res.data.house_number} Success!`);
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-slate-100 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center space-y-20">
          <h1 className="text-center text-3xl font-bold">Manage</h1>

          <button
            onClick={handleCreate}
            className="btn btn-success text-white mx-auto uppercase"
          >
            add house
          </button>
        </div>
        <div className="overflow-x-auto mt-20 px-0 md:px-5">
          <table className="table table-zebra">
            {/* Head */}
            <thead>
              <tr>
                <th>house_number</th>
                <th>village_id</th>
                <th>house_status</th>
                <th>hc_serailno</th>
                <th>alarm_status</th>
                <th>data/time</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item, idx) => (
                  <tr key={item._id}>
                    <td>{item.house_number}</td>
                    <td>{item.village_id}</td>
                    <td>{item.house_status}</td>
                    <td>{item.hc_serailno}</td>
                    <td>{JSON.stringify(item.alarm_status)}</td>
                    <td>{moment(item.updated_at).format("lll")}</td>
                    <td className="flex space-x-2">
                      <FiEdit
                        role="button"
                        onClick={() => handleEdite(item._id)}
                      />
                      <FiTrash2
                        role="button"
                        onClick={() => handleRemove(item._id, item.house_number)}
                        className="text-red-600"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p className="text-center">No, Data product..</p>
              )}
            </tbody>
          </table>
        </div>

        {create && <ModalCreate handleClose={handleClose} fetchData={fetchData} />}

        {edite && <ModalEdite handleClose={handleClose} fetchData={fetchData} />}
      </div>
    </div>
  );
}

export default Manage;
