import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/user";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  return (
    <div className="max-w-lg p-6 mt-6 bg-slate-100 mx-auto border rounded-lg shadow-lg ">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form action="" className="flex flex-col gap-4 ">
        <img
          className="w-24 h-24 self-center rounded-full"
          src={currentUser.avatar}
          alt="user photo"
        />
        <input
          type="text"
          className="p-3 border rounded-lg"
          defaultValue={
            currentUser.username[0].toUpperCase() +
            currentUser.username.slice(1)
          }
        />
        <input
          type="email"
          className="p-3 border rounded-lg"
          defaultValue={currentUser.email}
        />
        <input type="password" className="p-3 border rounded-lg" />

        <button className="p-3 rounded-lg bg-blue-500 text-white">
          Update Profile
        </button>
        <p
          onClick={handleSignOut}
          className="text-red-600 text-center cursor-pointer"
        >
          Sign out
        </p>
      </form>
    </div>
  );
};

export default Profile;
