import { useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signInDetails || {};

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        value={email}
        placeholder="Email"
        onChange={({ target: { value } }) =>
          setSignInDetails((prev) => ({ ...prev, email: value }))
        }
      />
      <br /> <br />
      <input
        value={password}
        placeholder="Password"
        onChange={({ target: { value } }) =>
          setSignInDetails((prev) => ({ ...prev, password: value }))
        }
      />
      <br /> <br />
      <button className="btn btn-primary" onClick={signIn}>
        {" "}
        Sign In
      </button>
      <br /> <br />
      <button onClick={signInWithGoogle}> Sign in with Google</button>
      <br /> <br />
      <button onClick={signout}>Sign Out</button>
      <br /> <br />
      {auth?.currentUser?.photoURL && (
        <img src={auth.currentUser.photoURL} alt="profile-pic" />
      )}
    </div>
  );
};

export default Auth;
