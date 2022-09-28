// GLOBAL
import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';

// LOCAL
import { MovieCard } from '../movie-card/movie-card';

// VIEW
export function DirectorView({ onBackClick, director, directorMovies }) {
  return (
    <Container className="mt-5">
      <h1> {director.Name}</h1>
      <p> Born In: {director.Birthyear} </p>
      <h5> Biography </h5>
      <p> {director.Bio}</p>
      <Button
        className="mb-3"
        type="button"
        onClick={() => {
          onBackClick();
        }}>
        Back
      </Button>
      <br />
      <h5>{director.Name} also directed: </h5>
      <Row className="justify-content mt-3 director-cardView">
        {directorMovies.map((movie) => (
          <MovieCard key={movie._id} movieData={movie}></MovieCard>
        ))}
      </Row>
    </Container>
  );
}
