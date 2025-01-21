import React, { useEffect, useState } from "react";
import { Modal, Backdrop, Button, Box, Fade } from "@mui/material";
import { useMovieConfig } from "../../../providers/MovieProvider";
import MovieCard from "./movieCard";
import AddMovie from "./addMovie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  padding: "15px 20px",
};

const MovieList = () => {
  const { movieList, getMovieList } = useMovieConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-3">
      <h1>Movie Lists</h1>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Add Movie
      </Button>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={isModalOpen}>
            <Box sx={style}>
              <AddMovie setIsModalOpen={setIsModalOpen} />
            </Box>
          </Fade>
        </Modal>
      )}
      {movieList?.map(({ title, id, actorName, awardedOscar }) => (
        <MovieCard
          title={title}
          id={id}
          actorName={actorName}
          setIsModalOpen={setIsModalOpen}
          awardedOscar={awardedOscar}
        />
      ))}
    </div>
  );
};

export default MovieList;
