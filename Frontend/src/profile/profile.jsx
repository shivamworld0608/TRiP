import React from "react";
import Navbar from "../components/Navbar";
import Profiles from "../components/profile";
import Footer from "../components/Footer";
function Profile() {
  const initlogged  = localStorage.getItem("Users");
  const loggedInUser = JSON.parse(initlogged);
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Profiles loggedInUser={loggedInUser} />
      </div>
      <Footer />
    </>
  );
}

export default Profile;