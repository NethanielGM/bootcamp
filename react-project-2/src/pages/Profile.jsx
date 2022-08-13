import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth, storage } from "../firebase-config";
import { getAuth, updateProfile } from "@firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const currentUser = getAuth();
  const { isAuth } = useContext(UserContext);
  const [UserNameChange, setUserNameChange] = useState("");
  const [defaultName, setDefaultName] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    setDefaultName(currentUser.displayName ? currentUser.displayName : "Guest");
    if (currentUser?.photoURL) {
      setImageAsFile(currentUser.photoURL);
    }
    return;
  }, []);

  const fireBaseUpload = async (e) => {
    e.preventDefault();
    if (!imageAsFile) {
      alert("No photo selected");
      return;
    }
    const fileRef = ref(storage, auth.currentUser.uid);
    await uploadBytes(fileRef, imageAsFile);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(auth.currentUser, { photoURL });
    alert("Photo Uploaded");
    navigate("/");
  };
  const changeUserName = () => {
    if (!UserNameChange || /^\s*$/.test(UserNameChange)) {
      return;
    }
    updateProfile(auth.currentUser, { displayName: UserNameChange });
    alert("Name Changed");
    navigate("/");
  };

  return (
    <>
      <div className="profile-div">
        <h1 className="profile">Profile </h1>
        <h1 className="defaultUser">
          {auth.currentUser.displayName
            ? auth.currentUser.displayName
            : defaultName}
        </h1>
      </div>

      <form className="name-form">
        <textarea
          placeholder="Change username"
          name="text"
          onChange={(e) => setUserNameChange(e.target.value)}
          className="tweet-input"
          rows="10"
          cols="10"
        />
      </form>
      <div className="input-div">
        <span></span>
        <button onClick={changeUserName} className="name-button">
          Save
        </button>
      </div>
      <form onSubmit={fireBaseUpload} className="input-div">
        <input
          onChange={(e) =>
            e.target.files[0] && setImageAsFile(e.target.files[0])
          }
          type="file"
          name="file"
        />
        <button className="name-button">Add photo</button>
      </form>
    </>
  );
};

export default Profile;
