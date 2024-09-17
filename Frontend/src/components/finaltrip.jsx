import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../../public/image.png";
import img2 from "/finalise.jpg";
/* for form */
import { useForm } from "react-hook-form";
/* import Cards from "./Cards"; */
import axios from "axios";
import toast from "react-hot-toast";

import { v4 as uuidv4 } from "uuid";
import Transdialog from "./transdialog";
import Splitdialog from "./split";

function Finaltrips() {
  const location = useLocation();
  const tripData = location.state?.tripData;
  const navigate = useNavigate();
  useEffect(() => {
    if (!tripData) {
      navigate("/", { replace: true });
    }
  }, [tripData, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // check for updates and we use usestate and useeffect here for continuosly updating the page
  const [trip, setTrip] = useState(tripData.trip);
  const [whopaid, setWhopaid] = useState([]);
  const [split, setSplit] = useState([]);
  console.log(split);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${import.meta.env.REACT_APP_BASE_URL}/trip/finaltrip`, {
          params: { tripcode: trip.tripcode },
        })
        .then((response) => {
          console.log(response.data.trip);
          setTrip(response.data.trip);
        });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [usernames, setUsernames] = useState(trip.usernames);

  const initialAuthUser = localStorage.getItem("Users");
  const authUser = JSON.parse(initialAuthUser);
  const { username } = authUser;

  function getExpenditureByUsername(username) {
    let userObject = trip.individualExpenditures.find(
      (item) => item.username === username
    );
    return userObject ? userObject.expenditure : "0";
  }

  function getnegativeExpenditureByUsername(username) {
    let userObject = trip.expenditurePerPerson.find(
      (item) => item.username === username
    );
    return userObject ? userObject.expenditure : "0";
  }

  let individualExpenditure = getExpenditureByUsername(username);
  let negative_expenditure = getnegativeExpenditureByUsername(username);

  const onSubmit = async (data) => {
    const initialAuthUser = localStorage.getItem("Users");
    const authUser = JSON.parse(initialAuthUser);
    const { username } = authUser;
    console.log(username);

    const tripInfo = {
      entry_by: username,
      amount: data.amount,
      comment: data.comment,
      tripcode: trip.tripcode,
      whopaid: whopaid,
      split: split,
    };

    let length = split.length;
    let newamount = data.amount / length;
    //map every split
    split.forEach((elt) => {
      if (elt.amount == 0) {
        elt.amount = newamount;
      }
      console.log(elt.amount);
    });
    reset();
    console.log("Form reset called");
    await axios
      .post(
        `${import.meta.env.REACT_APP_BASE_URL}/transaction/transaction`,
        tripInfo
      )
      .then((res) => {
        if (res.data) {
          toast.success("Amount added Successfully");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log("kuch gabad ho gya");
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  const whopays = async (data) => {
    axios
      .get(`${import.meta.env.REACT_APP_BASE_URL}/transaction/whopays`, {
        params: { tripcode: trip.tripcode },
      })
      .then((res) => {
        if (res.data) {
          navigate(`/whopays/${trip.tripcode}`, {
            replace: true,
            state: { whopaysdata: res.data.paymentlist, tripdata: trip },
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  //handling finalise transaction log button
  const [amt, setAmt] = useState("");

  const handleAmt = (e) => {
    setAmt(e.target.value);
    console.log(amt);
  };
  const finalise = async () => {
    axios
      .get(`${import.meta.env.REACT_APP_BASE_URL}/transaction/finalise`, {
        params: { tripcode: trip.tripcode },
      })
      .then((res) => {
        if (res.data) {
          navigate(`/transactionlog/${trip.tripcode}`, {
            replace: true,
            state: { transactionData: res.data, tripcode: trip.tripcode },
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  // different dialog

  const [isdiaopen1, setIsdiaopen1] = useState(false);
  const opendialog = () => {
    setIsdiaopen1(true);
  };
  const [word, setWord] = useState("Equally");
  const set = () => {
    setWord("Equally");
  };
  const set1 = () => {
    setWord("Unequally");
  };
  const closedialog = () => {
    setIsdiaopen1(false);
  };
  const [isdiaopen2, setIsdiaopen2] = useState(false);
  const opendialog2 = () => {
    setIsdiaopen2(true);
  };
  const closedialog2 = () => {
    setIsdiaopen2(false);
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          {tripData.trip.tripname}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <div
            className="bg-red  px-2 h-[50px] py-2 rounded-xl  text-center  dark:bg-slate-800 shadow-md border dark:border-slate-800"
            key={uuidv4()}
          >
            <h3 className="text-xl font-semibold ">
              Total Expenditure:
              <span className="ml-[10px]">
                Rs. {trip.overallExpenditure.toFixed(2)}
              </span>
            </h3>
          </div>
          <div
            className="bg-red  h-[50px] py-2 rounded-xl  text-center  dark:bg-slate-800 shadow-md border dark:border-slate-800"
            key={uuidv4()}
          >
            <h3 className="text-xl font-semibold mb-2">
              Your -ve Expenditure:
              <span className="ml-[10px]">
                Rs. {negative_expenditure.toFixed(2)}
              </span>
            </h3>
          </div>
          <div
            className="bg-red  px-2 h-[50px] py-2 rounded-xl  text-center  dark:bg-slate-800 shadow-md border dark:border-slate-800"
            key={uuidv4()}
          >
            <h3 className="text-xl font-semibold mb-2">
              Your Expenditure:{" "}
              <span className="ml-[10px]">
                Rs. {individualExpenditure.toFixed(2)}
              </span>
            </h3>
          </div>
        </div>
        <div className="mainContainer ml-[-5px] mt-[40px]  flex sm:flex-row  flex-wrap flex-col justify-around items-center  sm:space-y-2 space-y-4">
          <div className="container1 bg-red rounded-lg shadow-md px-2 pt-2  w-[330px] dark:bg-slate-800 shadow-md border dark:border-slate-800 ">
            <form
              className="flex flex-col items-center h-[300px]  sm:h-[300px] justify-around "
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
            >
              <div className="flex flex-col  ">
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  className="border border-[#1a43bf]  px-4 py-2 mb-4 rounded-md w-[16rem]"
                  {...register("amount", { required: true })}
                />
                {errors.amount && (
                  <span className="text-sm text-red-500">
                    Add amount first!!
                  </span>
                )}
                <input
                  type="text"
                  placeholder="Comment"
                  name="comment"
                  onChange={handleAmt}
                  className="border border-[#1a43bf] px-4 py-2  rounded-md w-[16rem]"
                  {...register("comment", { required: true })}
                />
                {errors.comment && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <div className="ml-[25px]">
                  <button
                    type="button"
                    className="bg-[#1a43bf] ml-[5px] border-2 px-4 py-1  rounded-md  duration-300 text-white"
                    onClick={opendialog}
                  >
                    Paid By ?
                  </button>{" "}
                  <button
                    type="button"
                    className="bg-[#1a43bf] ml-4 border-2 px-4 py-1  rounded-md  duration-300 text-white "
                    onClick={opendialog2}
                  >
                    For Whom ?
                  </button>
                  <Transdialog
                    isopen={isdiaopen1}
                    setpaid={setWhopaid}
                    names={usernames}
                    onclose={closedialog}
                  />
                  <Splitdialog
                    isopen={isdiaopen2}
                    setSplit={setSplit}
                    setword1={set}
                    setword2={set1}
                    names={usernames}
                    onclose={closedialog2}
                  />
                </div>

                <button
                  type="submit"
                  className="  w-[310px] bg-[#1a43bf]  text-white px-4 py-2 mt-6 rounded-md hover:bg-[#1a43bf]-300 duration-300"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
          <div className="container2 dark:bg-slate-800 shadow-md border dark:border-slate-800 rounded-lg shadow-md p-4  flex  flex-col sm:h-[300px] justify-between items-center">
            <img
              src={img2}
              alt="image"
              className="  sm:w-[13.5rem] hidden sm:block "
            />
            <button
              onClick={() => whopays()}
              className=" w-[310px] bg-[#1a43bf] text-white px-4 py-2 rounded-md duration-300"
            >
              Finalise all Expenses
            </button>
          </div>
          <div className="container3 dark:bg-slate-800 shadow-md border dark:border-slate-800 rounded-lg shadow-md p-4 bg-red rounded-lg shadow-md  flex  flex-col sm:h-[300px] justify-between items-center">
            <img
              src={img1}
              alt="image"
              className=" sm:w-[20rem] hidden sm:block "
            />
            <button
              onClick={() => finalise()}
              className="  w-[310px] bg-[#1a43bf] text-white px-4 py-2 rounded-md  duration-300"
            >
              Transaction Log
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Finaltrips;
