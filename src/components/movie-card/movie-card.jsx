// GLOBAL
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardGroup,
  Button,
  Col,
} from 'react-bootstrap';

// LOCAL
import { Link } from 'react-router-dom';

// SCSS
import './movie-card.scss';

// VIEW
export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <Col
        xs={12}
        md={6}
        lg={4}
        xl={3}
        className="mb-3 d-flex">
        <CardGroup>
          <Card border="light" className="mb-3">
            <Link to={`/movies/${movieData._id}`}>
              <Card.Img
                className="poster"
                variant="top"
                src={movieData.ImagePath}
                alt="Poster from the movie"
              />
            </Link>
            <Card.Body>
              <Card.Title className="cardText card-title">
                {' '}
                {movieData.Title}
              </Card.Title>
              <Card.Text className="cardText card-description">
                {movieData.Description.length < 131 &&
                  movieData.Description}
                {movieData.Description.length > 130 &&
                  movieData.Description.substring(0, 130) +
                    '...'}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-clr-footer">
              <Link to={`/movies/${movieData._id}`}>
                <Button className="details-button" variant="link">Show Details</Button>
              </Link>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Col>
    );
  }
}
// MovieCard.propTypes = {
//   movieData: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Imageurl: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birthyear: PropTypes.string,
//       Movies: PropTypes.array,
//     }),
//     Actors: PropTypes.array,
//     Featured: PropTypes.bool,
//   }).isRequired,
// };
