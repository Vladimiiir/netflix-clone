import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import "./ProfileScreen.css";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import PlansScreen from "./PlansScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);

  // console.log(user.uid);
  // console.log(user.email);
  // console.log(user.displayName);
  // console.log(user.photoURL);

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src={user?.photo}
            alt="avatarLogo"
            className="profileScreen__photo"
          />
          <div className="profileScreen__details">
            <h2>{user?.name}</h2>
            <h2>{user?.email}</h2>

            <div className="profileScreen__plans">
              <PlansScreen />
              <button
                className="profileScreen__signOut"
                onClick={() => {
                  signOut(auth);
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
