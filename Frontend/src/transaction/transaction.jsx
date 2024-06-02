import React from "react";
import Navbar from "../components/Navbar";
import TransactionLog from "../components/transactionlog";
import Footer from "../components/Footer";
function Transaction() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <TransactionLog/>
      </div>
      <Footer />
    </>
  );
}

export default Transaction;