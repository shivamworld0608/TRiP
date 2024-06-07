import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for HTTP requests
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Mytrips = ({ loggedInUser }) => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${import.meta.env.REACT_APP_BASE_URL}/trip/mytrips`, {
          params: { username: loggedInUser.username },
        })
        .then((response) => {
          setTrips(response.data.trips);
        });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  async function handleClick(trip) {
    // Do something with the trip data
    const tripInfo = {
      tripcode: trip.tripcode,
    };
    console.log(`Trip name: ${trip.tripname}, Trip code: ${trip.tripcode}`);
    await axios
      .post(`${import.meta.env.REACT_APP_BASE_URL}/trip/finaltrip`, tripInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          navigate(`/finaltrip/${trip.tripcode}`, {
            replace: true,
            state: { tripData: res.data },
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  }
  const handleCopy = () => {
    toast.success("Code Copied");
  };
  async function deletetrip(trip) {
    // Do something with the trip data
    const tripInfo = {
      tripcode: trip.tripcode,
      username: loggedInUser.username,
    };
    await axios
      .post(`${import.meta.env.REACT_APP_BASE_URL}/trip/deletetrip`, tripInfo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  }

  return (
    <div className="container mx-auto p-4 mt-16">
      <h2 className="text-2xl font-bold text-center mb-4">Your Trips</h2>
      <div className="flex justify-center  flex-wrap items-center align-center">
        {trips.map((trip, index) => (
          <div className="m-4" key={index}>
            <div
              className="w-[300px] rounded-2xl p-4 text-center bg-red dark:bg-slate-800 shadow-md border dark:border-slate-800"
              key={trip._id}
            >
              <button onClick={() => handleClick(trip)}>
                <h3 className="text-xl font-semibold mb-2">{trip.tripname}</h3>
                <p className="text-gray-500 mb-4">Trip Code: {trip.tripcode}</p>
              </button>
              <div className="flex justify-between px-[2rem]">
                <button
                  className=" w-[5rem] bg-[#1a43bf] text-white px-2 py-1 rounded-md hover:bg-pink-700 duration-300"
                  onClick={() => deletetrip(trip)}
                >
                  Delete
                </button>
                <CopyToClipboard text={trip.tripcode} onCopy={handleCopy}>
                  <button className=" w-[5rem] bg-[#1a43bf] text-white px-2 py-1 rounded-md hover:bg-pink-700 duration-300">
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mytrips;
