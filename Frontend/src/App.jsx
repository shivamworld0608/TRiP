import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Mytrip from "./Mytrip/mytrip";
import Jointrip from "./Jointrip/jointrip";
import Finaltrip from "./finaltrip/finaltrip";
import Createtrips from "./Createtrip/createtrip";
import Transaction from "./transaction/transaction";
import Whopayss from "./whopays/whopays";
import Profile from "./profile/profile";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

//import value should be in capital as it is not accepting small letter as first letter

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Mytrips"
            element={authUser ? <Mytrip /> : <Navigate to="/signup" />}
          />
          <Route
            path="/createtrip"
            element={authUser ? <Createtrips /> : <Navigate to="/signup" />}
          />
          <Route
            path="/jointrip"
            element={authUser ? <Jointrip /> : <Navigate to="/signup" />}
          />
          <Route
            path="/finaltrip/:tripcode"
            element={authUser ? <Finaltrip /> : <Navigate to="/signup" />}
          />
          <Route
            path="/transactionlog/:tripcode"
            element={authUser ? <Transaction /> : <Navigate to="/signup" />}
          />
          <Route
            path="/whopays/:tripcode"
            element={authUser ? <Whopayss /> : <Navigate to="/signup" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
