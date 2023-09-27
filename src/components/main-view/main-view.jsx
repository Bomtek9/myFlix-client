import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            
            id: "64f22dad90ebac5592caf568",
            Name: "It's A Wonderful Life",
            Description: "An angel is sent from Heaven to help a desperately frustrated businessman, George Bailey, by showing him what life would have been like if he had never existed.",
            ImagePath: "https://is1-ssl.mzstatic.com/image/thumb/Video49/v4/9b/f1/5b/9bf15b1d-1a2f-7fb3-c40a-1c0a1d8322ad/source/1200x630bb.jpg",
            Featured: "true"
        },
        {
            id: "64f2316590ebac5592caf56a",
            Name: "Teenage Mutant Ninja Turtles",
            Description: "Four teenage mutant ninja turtles Leonardo, Raphael, Donatello, and Michaelangelo fight crime in New York City from the shadows.",
            ImagePath: "https://www.screengeek.net/wp-content/uploads/2019/03/teenage-mutant-ninja-turtles.jpg",
            Featured: "true"
        },

        {
            id: "64f21b4f90ebac5592caf561",
            Name: "Interstellar",
            Description: "When Earth becomes uninhibitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
            ImagePath: "https://www.cinemahub.me/wp-content/uploads/2018/06/46590hd.jpg",
            Featured: "true"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
          <MovieView movie = {selectedMovie} onBackClick={() => 
          setSelectedMovie(null)} />
        );
    }

    if (movies.length == 0) {
        return<div>The List is Empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
              <MovieCard 
              key={movie.id} 
              movie={movie}
              onMovieClick={(newSelectedMovie) =>  {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
      </div>
    );
};