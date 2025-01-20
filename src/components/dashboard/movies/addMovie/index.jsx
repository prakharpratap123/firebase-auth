import React from "react";
import {
  IconButton,
  Tooltip,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { db } from "../../../../config/firebase";
import { addDoc, collection, updateDoc, doc } from "@firebase/firestore";
import {
  useMovieConfig,
  initialState,
} from "../../../../providers/MovieProvider";
import "./style.scss";

const AddMovie = ({ setIsModalOpen }) => {
  const { getMovieList, movieDetails, setMovieDetails } = useMovieConfig();
  const movieCollectionRef = collection(db, "movies");

  const { actorName, awardedOscar, imdbRating, netEarningInCrores, title } =
    movieDetails || {};

  const handleChange = (field, value) => {
    setMovieDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      movieDetails?.id
        ? await updateDoc(doc(db, "movies", movieDetails?.id), movieDetails)
        : await addDoc(movieCollectionRef, movieDetails);
      setTimeout(() => {
        getMovieList();
        setIsModalOpen(false);
        setMovieDetails(initialState);
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="add-movie-contents">
      <div className="header">
        <div className="title">{`${
          movieDetails?.id ? "Edit" : "Add"
        } Movie`}</div>
        <IconButton
          onClick={() => {
            setIsModalOpen(false);
            setMovieDetails(initialState);
          }}
        >
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
      </div>

      <div className="body pt-3">
        <div className="row mb-3">
          <div className="col-6">
            <TextField
              size="small"
              value={title}
              onChange={({ target: { value } }) => handleChange("title", value)}
              label="Movie Title"
            />
          </div>

          <div className="col-6">
            <TextField
              size="small"
              value={actorName}
              label="Actor Name"
              onChange={({ target: { value } }) =>
                handleChange("actorName", value)
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <TextField
              size="small"
              type="number"
              value={netEarningInCrores}
              onChange={({ target: { value } }) =>
                handleChange("netEarningInCrores", +value)
              }
              label="Net Earning (in Crores)"
            />
          </div>

          <div className="col-6">
            <TextField
              size="small"
              type="number"
              value={imdbRating}
              onChange={({ target: { value } }) =>
                handleChange("imdbRating", +value)
              }
              label="IMDB Rating"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={awardedOscar}
                    onChange={({ target: { checked } }) =>
                      handleChange("awardedOscar", checked)
                    }
                  />
                }
                label="Did this movie get oscar?"
              />
            </FormGroup>
          </div>
        </div>

        <div className="text-center">
          <Button variant="contained" onClick={onSubmit}>
            {movieDetails?.id ? "Save" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
