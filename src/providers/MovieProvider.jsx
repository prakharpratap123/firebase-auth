import React, { createContext, useContext, useState } from "react";
import { getDocs, collection, doc, getDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

const MovieContext = createContext();

const initialState = {
  actorName: "",
  awardedOscar: false,
  imdbRating: "",
  netEarningInCrores: "",
  title: "",
};

const useMovies = () => {
  const movieCollectionRef = collection(db, "movies");
  const [movieList, setMovieList] = useState([]);
  const [movieDetails, setMovieDetails] = useState(initialState);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const docRef = doc(db, "movies", movieId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMovieDetails({ ...docSnap.data(), id: movieId });
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  };
  return {
    movieList,
    setMovieList,
    getMovieList,
    movieDetails,
    setMovieDetails,
    getMovieDetails,
  };
};

const MovieProvider = ({ children }) => {
  return (
    <MovieContext.Provider value={useMovies()}>
      {children}
    </MovieContext.Provider>
  );
};

const useMovieConfig = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};

export { MovieProvider, useMovieConfig, initialState };
