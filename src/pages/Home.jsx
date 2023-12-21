import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/ui/Card";

function Home() {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [value, setValue] = useState({
    date: "",
    time: "",
    date2: "",
    time2: "",
  });


  const fetchData = () => {
    axios
      .get(`https://fibaroalarmapi.onrender.com/housestatus/top100`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("test");
  };


  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .get(
        `https://fibaroalarmapi.onrender.com/housestatus/datetime?from=${value.date}T${value.time}:00&to=${value.date2}T${value.time2}:59`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };


  useEffect(() => {
    fetchData();

    // Polling interval (every 5 seconds in this case)
    /* const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval); */
  }, []);

  return (
    <div className="w-full bg-slate-500 pt-20">
      <h1 className="text-center text-3xl text-white my-10">ชื่อหมู่บ้าน 1 </h1>
      <div className="container mx-auto">
        <div className="flex justify-center mx-auto w-full space-x-5">
          <input
            type="date"
            name="date"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
        </div>

        <h2 className="text-center text-white">From</h2>

        <div className="flex justify-center mx-auto w-full space-x-5">
          <input
            type="date"
            name="date2"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
          <input
            type="time"
            name="time2"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-10">
          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
        </div>

        {/* Card House */}
        <div className="bg-blue-100 w-full py-20 px-5 lg:px-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data ? (
              data.map((item, idx) => (
                <Card
                  id={item._id}
                  house_num={item.house_number}
                  status={item.house_status}
                  alarm={item.alarm_status}
                  key={item._id}
                />
              ))
            ) : (
              <p className="text-center">No, Data product..</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
