import React from "react";
import Navbar from "../components/Navbar";
import Whopays from "../components/whopays";
import Footer from "../components/Footer";
function Whopayss() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Whopays/>
      </div>
      <Footer />
    </>
  );
}

export default Whopayss;