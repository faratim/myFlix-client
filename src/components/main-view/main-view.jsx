//Import react into file
import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';


//Exporting the MainView component makes it available for use by other components, modules, and files
class MainView extends React.Component {
    constructor(){
        super();
         // code executed right when the component is created in the memory
        // Initial state is set to null
         this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }
    componentDidMount(){
    // code executed right after the component is added to the DOM.
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
    // code executed just before the moment the component gets removed from the DOM.

    }
    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(movie){
        this.setState({
            selectedMovie: movie
        });
    }
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
          user
        });
      }
    render() {
        const { movies, selectedMovie, user} = this.state;
         /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if(movies.length === 0) return <div className="main-view">The list is empty</div>; 
        //Displays movie list
        //JSX
        return (
            <div className="main-view">
                   {/*If the state of `selectedMovie` is not null, that selected movie will be 
                   returned otherwise, all *movies will be returned*/}
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              ))
            }
          </div>
        );
    }
}
export default MainView;