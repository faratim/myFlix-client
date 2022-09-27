// GLOBAL //
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';


// LOCAL //

// Redux Actions
import {
  setMovies,
  setUser,
  setAllUsers,
  addFavorite,
  deleteFavorite,
} from '../../actions.actions';

// Components - Admin
import MoviesList from '../movies-list/movies-list';
import { NavBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';

// Components - Movies
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

// Components - Services
import { UserService } from '../../services/user-services';
import { MovieService } from '../../services/movie-services';

import { setMovies, setFilter } from '../../actions/actions';

// SCSS
import './main-view.scss';


// MAINVIEW
class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  // Get all movies if user has token🪙
  getMovies(token) {
    const movieService = new MovieService(token);
    if (token !== null) {
      movieService.getAllMovies(
        {},
        (response) => {
          this.props.setMovies(response.data);
        },
        (error) => {
          console.error(
            'getAllMovies Err MovieService ' + error
          );
        }
      );
    }
  }

  // Upon successful login, 'user' property is updated to that user in state
  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getUser(token) {
    const user = localStorage.getItem('user');
    const userService = new UserService(token);
    if (token !== null && user !== null) {
      userService.getOneUser(
        { user },
        (response) => {
          this.props.setUser(response.data);
        },
        (error) => {
          console.error('getUser Err UserService ' + error);
        }
      );
    }
  }

  // Add/Remove Favorite Movie
  handleFav = (movieID, action) => {
    const { user } = this.props;
    const { Username } = user;
    const token = localStorage.getItem('token');
    const userService = new UserService(token);
    if (token !== null && Username !== null) {
      if (action === 'add') {
        this.props.addFavorite(movieID);
        userService.addFavoriteMovie(
          { Username, movieID },
          () =>
            alert(
              `Movie added to ${Username}'s favorite movies.`
            ),
          (error) =>
            this.errorCallback(
              error,
              'addFav Error UserService '
            )
        );
      } else if (action === 'remove') {
        this.props.deleteFavorite(movieId);
        userService.removeFavoriteMovie(
          { Username, movieId },
          (res) => {
            alert(`Movie removed from your favorites list.`);
            window.open(`/users/${Username}`, '_self');
          },
          (error) => {
            console.error(
              'removeFav Error UserService' + error
            );
          }
        );
      }
    }
  };

  render() {
    const { user, movies } = this.props
    const { Username, FavoriteMovies } = user;

    return (
      <Router>
        <NavBar user={user} />
        <Container fluid>
          <Row className="main-view-width mx-auto justify-content-md-center mt-3">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      onBackClick={history.goBack}
                      favoriteMovies={favoriteMovies}
                      handleFavorite={this.handleFavorite}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    isFavorite={favoriteMovies.includes(match.params.movieId)}
                    onBackClick={history.goBack}
                    handleFavorite={this.handleFavorite}
                  />
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
let mapStateToProps = (state) => {
  return { movies: state.movies };
};
export default connect(mapStateToProps, { setMovies, setFilter })(MainView);