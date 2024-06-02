import React from "react";
import Navbar from "../components/Navbar";
import Createtrip from "../components/Createtrip";
import Footer from "../components/Footer";
function Createtrips() {
  /* const initlogged  = localStorage.getItem("Users");
  const loggedInUser = JSON.parse(initlogged); */
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Createtrip /* loggedInUser={loggedInUser} */  />
      </div>
      <Footer />
    </>
  );
}

export default Createtrips;
