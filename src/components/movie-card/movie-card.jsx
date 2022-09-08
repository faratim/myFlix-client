import React from 'react';
import PropTypes from 'prop-types';
 export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick } = this.props;
        return (
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
            );
    }
}
MovieCard.propTypes = {
    movie: PropTypes.shape({
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre:PropTypes.string.isRequired,
      Director:PropTypes.string.isRequired,
      Actors:PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };