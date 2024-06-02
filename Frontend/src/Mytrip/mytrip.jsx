import React from "react";
import Navbar from "../components/Navbar";
import Mytrips from "../components/Mytrips";
import Footer from "../components/Footer";
function Mytrip() {
  const initlogged  = localStorage.getItem("Users");
  const loggedInUser = JSON.parse(initlogged);
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Mytrips loggedInUser={loggedInUser} />
      </div>
      <Footer />
    </>
  );
}

export default Mytrip;
