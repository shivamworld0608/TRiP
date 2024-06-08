import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [id, setId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    formState: { errors },
  } = useForm();

  const [style, setStyle] = useState("hidden");
  const [verotp, setVerotp] = useState("Verify Email");
  const [imp, setImp] = useState("0");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    if (verotp === "Verify Email") {
      toast.success("Verifying");
      onSubmit();
      /* if(imp === "1"){
        console.log("aagya check kr ke");
      setStyle("block");
      setVerotp("Signup");
      setImp("0");
    } */
    } else {
      toast.success("Verifying");
      verify();
    }
  };

  useEffect(() => {
    if (imp === "1") {
      setStyle("block");
      setVerotp("Signup");
      setImp("0");
    }
  }, [imp]);

  const verify = async () => {
    const userInfo = {
      user_id: id,
      otp: formData.otp,
    };
    await axios
      .post(`${import.meta.env.REACT_APP_BASE_URL}/user/verify`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setId(res.data.user._id);
          toast.success("Email Verified Successfully");
          /*   setTimeout(() => {
            localStorage.setItem("Users", JSON.stringify(res.data.user));
            window.location.reload();
          }, 100);
/*           localStorage.setItem("Users", JSON.stringify(res.data.user));
          window.location.reload(); */
          navigate(from, { replace: true });
          window.location.reload();
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  const onSubmit = async () => {
    const userInfo = {
      email: formData.email,
      fullname: formData.fullname,
      username: formData.username,
      password: formData.password,
    };
    console.log("call karne se phle");
    await axios
      .post(`${import.meta.env.REACT_APP_BASE_URL}/user/signup`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          if (
            res.data.message === "Email already used" ||
            res.data.message === "This Username is not available" ||
            res.data.message === "Technical Error in sending OTP"
          ) {
            toast.error(res.data.message);
            setImp("0");
          } else {
            setImp("1");
            toast.success("Verify Your Email Now");
            setId(res.data.user._id);
          }
        }
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
      <div className="flex  items-center justify-center">
        <div className="w-[400px]">
          <div className="modal-box max-h-full overflow-auto">
            <form>
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Nick Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <span>UserName</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Set your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className={`${style} mt-4 space-y-2`}>
                <span>OTP</span>
                <br />
                <input
                  type="text"
                  placeholder="Verify OTP"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                />
                <br />
                {errors.otp && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex justify-around mt-4">
                <div>
                  <button
                    type="button" // Change to button type to prevent form submission
                    onClick={handleButtonClick} // Call handleButtonClick instead of onSubmit
                    className="bg-[#1a43bf] w-[130px] text-white rounded-md px-2 py-1 mr-[5px] "
                  >
                    {verotp}
                  </button>
                </div>
              </div>
            </form>
            <div className="text-md mt-[10px] ml-[10px]">
              Already Have an account?{" "}
              <button
                className="underline text-blue-500 cursor-divointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>{" "}
              <Login />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
