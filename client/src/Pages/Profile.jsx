import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/user";

const Profile = () => {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update-user/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateFailure(data.message));
        enqueueSnackbar("An error occured", { variant: "error " });
        return;
      }

      dispatch(updateSuccess(data));
      enqueueSnackbar("User updated successfully", { variant: "success" });
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleSignOut = async (e) => {
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 self-center hover:cursor-pointer rounded-full"
          src={formData.avatar || currentUser.avatar}
          alt="user photo"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-600">Error Uploading file</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          onChange={handleChange}
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
        <input
          type="password"
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <button className="p-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
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
