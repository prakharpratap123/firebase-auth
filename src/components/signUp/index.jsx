import React from "react";
import { auth, googleAuthProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import "./style.scss";

const SignUp = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // await signInWithRedirect(auth, googleAuthProvider);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="signup-modal d-flex align-items-center justify-content-center">
        <button className="btn btn-primary" onClick={signInWithGoogle}>
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
