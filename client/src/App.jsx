import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import PrivateUser from "./Components/PrivateUser";
import Expenses from "./Pages/Expenses";
import Incomes from "./Pages/Incomes";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateUser />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/incomes" element={<Incomes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
