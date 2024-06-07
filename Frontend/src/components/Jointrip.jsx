import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
/* import Cards from "./Cards"; */
import axios from "axios";
import toast from "react-hot-toast";
function Jointrip() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const initialAuthUser = localStorage.getItem("Users");
    const authUser = JSON.parse(initialAuthUser);
    const { username } = authUser;

    console.log(username);
    const tripInfo = {
      tripcode: data.tripcode,
      username: username,
    };
    await axios
      .post(`${import.meta.env.REACT_APP_BASE_URL}/trip/jointrip`, tripInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Trip Joined Successfully");
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

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-[4rem] items-center justify-center text-center">
          {/* Form for taking trip input */}
          <div className="mt-12 py-4">
            <h2 className="text-xl md:text-2xl text-center mb-4">Join Trip</h2>
            <form
              className="flex w-[300px] py-8 flex-col items-center m-auto rounded-2xl p-4 text-center bg-red dark:bg-slate-800 shadow-md border dark:border-slate-800"
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
            >
              <input
                type="text"
                placeholder="Trip Code"
                name="tripcode"
                className="border border-gray-300 px-4 py-2 mb-4 rounded-md w-[16rem]"
                {...register("tripcode", { required: true })}
              />
              {errors.tripcode && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              <button
                type="submit"
                className="bg-[#1a43bf] text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
              >
                Join the Trip
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Jointrip;
