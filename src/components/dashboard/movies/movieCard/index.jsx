import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useMovieConfig } from "../../../../providers/MovieProvider";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../../../config/firebase";
import "./style.scss";

const MovieCard = ({ title, id, setIsModalOpen, awardedOscar, actorName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { getMovieList, getMovieDetails } = useMovieConfig();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      setTimeout(() => {
        getMovieList();
        handleClose();
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      setIsModalOpen(true);
      getMovieDetails(id);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="movie-card">
        <div className="header">
          <div className="title">{title}</div>
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleEdit(id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
          </Menu>
        </div>

        <div className="details">
          <p> Actor Name : {actorName} </p>
          <p> Got Oscar : {awardedOscar ? "Yes" : "No"} </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
