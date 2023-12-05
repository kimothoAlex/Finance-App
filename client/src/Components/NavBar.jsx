import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-blue-300  shadow-md">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto">
        <Link to={"/"}>
          <h1 className="text-sm sm:text-xl font-bold flex flex-wrap">
            <span className="text-blue-800">
              {currentUser ? currentUser.username : " Your"}
            </span>{" "}
            <span className="text-blue-950">Finances</span>
          </h1>
        </Link>
        <form className="flex items-center p-3 rounded:lg bg-slate-100">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="search..."
          />
          <FaSearch className="text-blue-700" />
        </form>
        <ul className="flex gap-10 items-center">
          <Link to={"/"}>
            <li className="hidden sm:inline text-blue-700 cursor-pointer">
              Home
            </li>
          </Link>
          {currentUser ? (
            <Link to={"profile"}>
              <img
                className="rounded-full object-cover h-8 w-8"
                src={currentUser.avatar}
                alt="profile picture"
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <li className=" sm:inline text-blue-700 cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
