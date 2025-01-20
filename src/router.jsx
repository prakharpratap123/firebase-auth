import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import Dashboard from "./components/dashboard";
import { auth } from "./config/firebase";

const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={isSignedIn ? <Dashboard /> : <SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
