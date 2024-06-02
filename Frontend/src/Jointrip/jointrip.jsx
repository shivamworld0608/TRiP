import React from "react";
import Navbar from "../components/Navbar";
import Jointrip from "../components/Jointrip";
import Footer from "../components/Footer";
function Jointrips() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Jointrip />
      </div>
      <Footer />
    </>
  );
}

export default Jointrips;