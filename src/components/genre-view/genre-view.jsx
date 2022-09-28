// GLOBAL
import React from "react";
import { Container, Button, Row } from 'react-bootstrap';

// LOCAL
import { MovieCard } from '../movie-card/movie-card';

// SCSS
import "./genre-view.scss";

// VIEW
export function GenreView({ genre, onBackClick, genreMovies }) {
  return (
    <Container>
      <h1>{genre.Name}</h1>
      <p></p>
      <h5>Description</h5>
      <p>{genre.Description}</p>
      <Button
        className="mb-3"
        type="button"
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
      <h5>Other {genre.Name} Movies</h5>
      <Row className="justify-content mt-3 director-cardView">
        {genreMovies.map((movie) => (
          <MovieCard key={movie._id} movieData={movie}></MovieCard>
        ))}
      </Row>
    </Container>
  );
}