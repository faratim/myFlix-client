//Import react into file
import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

class MainView extends React.Component {
    constructor(){
        super();

         this.state = {
            movies: [],
            selectedMovie: null,
           user: null
        };
    }
    componentDidMount(){
        axios.get('https://faraflix.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies:response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    componentWillUnmount(){

    }
    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
    setSelectedMovie(movie){
        this.setState({
            selectedMovie: movie
        });
    }
    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
    onLoggedIn(authData) {
      console.log(authData);  
      this.setState({
          user: authData.user.Username
      });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
  
  getMovies(token) {
    axios.get('https://faraflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    render() {
        const { movies, selectedMovie, user} = this.state;
         /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if(movies.length === 0) return <div className="main-view">The list is empty</div>; 

        return (
            <Row className="main-view justify-content-md-center">
              {selectedMovie
                ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                  </Col>
                )
                : movies.map(movie => (
                  <Col className="card-class" sm={6} md={6} lg={4} xl={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))
              }
            </Row>
          );
        }
    }
export default MainView;