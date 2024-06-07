import React, { useState, useEffect } from "react";
import axios from "axios";
import user from "../../public/user.webp";

function Profiles({ loggedInUser }) {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${import.meta.env.REACT_APP_BASE_URL}/user/profile`, {
          params: { username: loggedInUser.username },
        })
        .then((response) => {
          setProfile(response.data.user);
          console.log(response.data.user);
        });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="  md:p-[20px] md:w-[60vw] w-[90vw] m-auto  rounded-lg shadow-2xl p-4 text-xl font-semibold mb-2 mt-[6rem] flex flex-col md:flex-row justify-between text-center items-center m-auto rounded-2xl p-4 text-center bg-red dark:bg-slate-800 shadow-md border dark:border-slate-800">
      <div>
        <img className="h-[8rem]" src={user} alt="" />
      </div>
      <table className="divide-y divide-gray-200 rounded-lg">
        <tbody className="bg-white divide-y divide-gray-200 rounded-lg">
          <tr>
            <td className="px-6 py-4 whitespace-no wrap rounded-tl-lg">
              <div className="text-sm text-gray-900">Name:</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap rounded-tr-lg ">
              <div className="text-sm text-gray-900">{profile.fullname}</div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Username:</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap ">
              <div className="text-sm text-gray-900">{profile.username}</div>
            </td>
          </tr>

          <tr>
            <td className="px-6 py-4 whitespace-nowrap rounded-bl-lg">
              <div className="text-sm text-gray-900">Email:</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap rounded-br-lg">
              <div className="text-sm text-gray-900">{profile.email}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profiles;
