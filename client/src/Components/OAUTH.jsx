import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/user";
const OAUTH = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      console.log(res);

      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: res._tokenResponse.firstName,
          email: res._tokenResponse.email,
          avatar: res._tokenResponse.photoUrl,
        }),
      });
      const data = await result.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className=" flex items-center justify-center gap-2 hover:bg-slate-800 bg-slate-600 p-3 mt-6 w-full rounded-md text-white"
      >
        <FcGoogle className="w-7 h-7" />
        <p>Continue with Google</p>
      </button>
    </div>
  );
};

export default OAUTH;
