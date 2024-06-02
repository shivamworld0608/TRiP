import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Whopays = () => {
    const location = useLocation();
    const whopaysdata = location.state?.whopaysdata;
    const trip=location.state?.tripdata;
    const navigate = useNavigate();
   
const tripdata={trip};
const tripcode =trip.tripcode;
  const handleBack = () => {
    navigate(`/finaltrip/${tripcode}`, { replace: true , state: { tripData: tripdata}  });// Navigate back in history
  };

    return (
    

        <div className="container mx-auto p-4 mt-16">
        <h2 className="text-2xl font-bold text-center mb-4">Who pays to whom and how much</h2>
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"> 
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Who
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        To Whom
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {whopaysdata.map((whopay) => (
                                    <tr key={whopay.to}>
                                        <td className="px-6  py-4 whitespace-nowrap">
                                            <div className="text-sm text-[red]">{whopay.from}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">Rs. {whopay.amount}</div>
                                        </td>
                                        <td className="px-6  py-4 whitespace-nowrap">
                                            <div className="text-sm text-[green]">{whopay.to}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

<div className="m-auto relative">

        <button onClick={handleBack} className=" absolute w-[5rem] bg-[#1a43bf] text-white px-3 py-2 rounded-md mt-[10px] duration-300 right-0 " >Back</button>
    </div>

    </div>

    );
};

export default Whopays;
