import React from "react";
import MovieList from "./movies";
import { MovieProvider } from "../../providers/MovieProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import "./style.scss";

const Dashboard = () => {
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-end">
        <button className="btn btn-danger" onClick={signout}>
          Log out
        </button>
      </div>
      <MovieProvider>
        <MovieList />
      </MovieProvider>
    </>
  );
};

export default Dashboard;
