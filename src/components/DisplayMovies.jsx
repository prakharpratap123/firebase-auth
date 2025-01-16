import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";

const DisplayMovies = () => {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");

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

  //Crud Operation

  const addMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: "Tiger",
        actorName: "Pankaj Tripathi",
        awardedOscar: false,
        rating: 7.3,
        releaseDate: "2012-09-30",
        subtitle: true,
      });
      setTimeout(() => {
        getMovieList();
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      setTimeout(() => {
        getMovieList();
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovie = async (id) => {
    try {
      await updateDoc(doc(db, "movies", id), { title: "Tiger 2" });
      setTimeout(() => {
        getMovieList();
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <h1 style={{ color: "orange" }}>DisplayMovies</h1>
      <div>
        {movieList?.map(({ title, releaseDate, id }) => (
          <>
            <h2>{title}</h2>
            <p>Released Date : {releaseDate}</p>{" "}
            <button onClick={() => deleteMovie(id)}>Delete</button>
            <button onClick={() => updateMovie(id)}>Update</button>
          </>
        ))}
      </div>

      <div style={{ marginTop: "50px" }}>
        <button onClick={addMovie}>Add Movie</button>
      </div>
    </div>
  );
};

export default DisplayMovies;
