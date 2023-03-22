import React, { useRef } from "react";
import "./SignUpScreen.css";
import { auth } from "../firebase";
// import db from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // register with email and password
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential); // UserCredentialImpl
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // sign in with email and password
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential); // UserCredentialImpl
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // sign in with Google account
  const signInWithGoogle = (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user); // UserCredentialImpl
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        {/* Sign in with Google */}
        <div className="signInWithGoogle">
          <img
            alt="googleLogo"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          />
          <button type="submit" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>
        <div className="signupScreen__createAccount">
          <h5>New to Netflix?</h5>
          <h5 onClick={register}>Sign Up now.</h5>
        </div>
      </form>
    </div>
  );
}

export default SignUpScreen;
