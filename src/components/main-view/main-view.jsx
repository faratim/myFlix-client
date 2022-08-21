import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: `Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves.`, ImagePath: 'https://m.media-amazon.com/images/I/5103Iag9c9L._AC_.jpg', Director: 'Christopher Nolan', Genre: 'Action', ReleaseYear: '2010', Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Cillian Murphy'
             },
                { _id: 2, Title: 'The Shawshank Redemption', Description: `Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn't commit the crimes.`, ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg', Director: 'Frank Darabont', Genre: 'Drama', ReleaseYear: '1994', Actors: 'Morgan Freeman, Tim Robbins'
            },
                { _id: 3, Title: 'Gladiator', Description: `A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.`, ImagePath: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png', Director: 'Ridley Scott', Genre: 'Action', ReleaseYear: '2000', Actors: 'Russell Crowe, Joaquin Phoenix' }
            ],
            selectedMovie: null
        };
    }
    
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
}

export default MainView;