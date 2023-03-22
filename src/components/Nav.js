import React, { useState, useEffect } from "react";
import "./Nav.css";
import ProfileScreen from "../screens/ProfileScreen";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="netflixLogo"
          onClick={() => {
            navigate("/");
          }}
        />
        <img
          className="nav__avatar"
          src={user?.photo}
          alt="netflixAvatar"
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
    </div>
  );
}

export default Nav;
