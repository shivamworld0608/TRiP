import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Geeksforgeeks", students: 400 },
  { name: "Technical scripter", students: 700 },
  { name: "Geek-i-knack", students: 200 },
  { name: "Geek-o-mania", students: 1000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function TransactionLog() {
  const location = useLocation();
  const [usernames, setUsernames] = useState([]);
  const [trip, setTrip] = useState([]);
  /*     const transactionData = location.state.transactionData; */
  const tripcode = location.state.tripcode;

  const navigate = useNavigate();
  const tripdata = { trip };
  const handleBack = () => {
    navigate(`/finaltrip/${tripcode}`, {
      replace: true,
      state: { tripData: tripdata },
    }); // Navigate back in history
  };
  const [transactionlog, setTransactionlog] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${import.meta.env.REACT_APP_BASE_URL}/transaction/finalise`, {
          params: { tripcode: tripcode },
        })
        .then((response) => {
          setTransactionlog(response.data.transactionlog);
          console.log(response.data.tripp.usernames);
          setUsernames(response.data.tripp.usernames);
          setTrip(response.data.tripp);
        });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [tripcode]);
  console.log(Array.isArray(transactionlog));

  return (
    <div className="container mx-auto p-4 mt-16">
      <h2 className="text-2xl font-bold text-center mb-4">Transaction Log</h2>
      <div className="flex flex-col rounded-2xl p-6 text-center bg-red dark:bg-slate-800 shadow-xl border dark:border-slate-800">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Timestamp
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry by
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Comment
                    </th>
                    {usernames.map((elt) => {
                      return (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {elt}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactionlog.map((transaction) => (
                    <tr key={transaction.tripcode}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.timestamp}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.entry_by}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Rs. {transaction.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {transaction.comment}
                        </div>
                      </td>
                      {usernames.map((user) => {
                        return (
                          <td
                            key={user}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <div className=" ml-[-2rem] w-[10rem] flex space-betweeen">
                              <div className="w-[5rem]">
                                {transaction.whopaid.map((elt) => {
                                  if (elt.username === user) {
                                    return (
                                      <span
                                        className="text-[green]"
                                        key={elt.username}
                                      >
                                        {/* Render whatever you want to display here, e.g., elt.amount */}
                                        {"+" + elt.amount.toFixed(2)}
                                      </span>
                                    );
                                  }
                                  return null; // Return null if the condition is not met
                                })}
                              </div>
                              &nbsp;&nbsp;&nbsp;
                              <div className="w-[5rem]">
                                {transaction.split.map((elt) => {
                                  if (elt.username === user) {
                                    return (
                                      <span
                                        className="text-[red] "
                                        key={elt.username}
                                      >
                                        {/* Render whatever you want to display here, e.g., elt.amount */}
                                        {-elt.amount.toFixed(2)}
                                      </span>
                                    );
                                  }
                                  return null; // Return null if the condition is not met
                                })}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto relative">
        <button
          onClick={handleBack}
          className=" absolute w-[5rem] bg-[#1a43bf] text-white px-3 py-2 rounded-md mt-[10px] duration-300 right-0 "
        >
          Back
        </button>
      </div>
      {/* <ResponsiveContainer width="100%" aspect={3}>
        <PieChart width={730} height={250}>
          <Pie
            data={transactionlog}
            dataKey="amount"
            nameKey="comment"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer> */}
    </div>
  );
}
export default TransactionLog;
