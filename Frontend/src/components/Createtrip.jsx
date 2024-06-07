import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
/* import Cards from "./Cards"; */
import axios from "axios";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Createtrip() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const initialAuthUser = localStorage.getItem("Users");
    const authUser = JSON.parse(initialAuthUser);
    const { username } = authUser;

    console.log(username);
    console.log(import.meta.env.REACT_APP_BASE_URL);
    const tripInfo = {
      tripname: data.tripname,
      tripcode: data.tripcode,
      username: username,
    };
    await axios
      .post(`${import.meta.env.REACT_APP_BASE_URL}/trip/createtrip`, tripInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Trip Created Successfully");
          navigate("/mytrips", { replace: true });
        }
        localStorage.setItem("Trips", JSON.stringify(res.data.trip));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  const [tripCode, setTripCode] = useState("");

  function autogenerate() {
    axios
      .get(`${import.meta.env.REACT_APP_BASE_URL}/trip/autocode`)
      .then((res) => {
        if (res.data) {
          setTripCode(res.data.code);
          setValue("tripcode", res.data.code, { shouldValidate: true });
          console.log(res.data.code);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  }

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-[4rem] items-center justify-center text-center">
          {/* Form for taking trip input */}
          <div className="mt-12 py-4">
            <h2 className="text-xl md:text-2xl text-center mb-4">
              Enter Trip Details
            </h2>
            <form
              className=" w-[300px] flex flex-col items-center m-auto rounded-2xl p-6 text-center bg-red dark:bg-slate-800 shadow-md border dark:border-slate-800"
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
            >
              <input
                type="text"
                placeholder="Trip Name"
                name="tripname"
                className="border border-gray-300 px-4 py-2 mb-4 rounded-md w-[16rem]"
                {...register("tripname", { required: true })}
              />
              {errors.tripname && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              <input
                type="text"
                placeholder="Trip Code"
                name="tripcode"
                value={tripCode}
                onChange={(e) => setTripCode(e.target.value)}
                className="border border-gray-300 px-4 py-2 mb-4 rounded-md w-[16rem]"
                {...register("tripcode", { required: true })}
              />
              {errors.tripcode && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              <div className="flex justify-between w-[240px] m-[10px]">
                <button
                  type="button"
                  className="bg-[#1a43bf] text-white px-4 py-1 rounded-md hover:bg-pink-700 duration-300"
                  onClick={() => autogenerate()}
                >
                  Generate code
                </button>

                <CopyToClipboard text={tripCode}>
                  <button
                    type="button"
                    className="bg-[#1a43bf] text-white px-4 py-1 rounded-md hover:bg-pink-700 duration-300"
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>

              <button
                type="submit"
                className=" w-[240px] bg-[#1a43bf] text-white px-4 py-1 rounded-md hover:bg-pink-700 duration-300"
              >
                Create Your Trip
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Createtrip;
