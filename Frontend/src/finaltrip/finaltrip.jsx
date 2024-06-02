import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Finaltrips from "../components/finaltrip";

function Finaltrip() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Finaltrips/>
      </div>
      <Footer />
    </>
  );
}

export default Finaltrip;