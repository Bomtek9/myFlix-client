import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            
            id: "64f22dad90ebac5592caf568",
            Name: "It's A Wonderful Life",
            Description: "An angel is sent from Heaven to help a desperately frustrated businessman, George Bailey, by showing him what life would have been like if he had never existed.",
            ImagePath: "itsawonderfullife.png",
            Featured: "true"
        },
        {
            id: "64f2316590ebac5592caf56a",
            Name: "Teenage Mutant Ninja Turtles",
            Description: "Four teenage mutant ninja turtles Leonardo, Raphael, Donatello, and Michaelangelo fight crime in New York City from the shadows.",
            ImagePath: "teenagemutantninjaturtles.png",
            Featured: "true"
        },

        {
            id: "64f21b4f90ebac5592caf561",
            Name: "Interstellar",
            Description: "When Earth becomes uninhibitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
            ImagePath: "interstellar.png",
            Featured: "true"
        }
    ]);

    const [selectedMovie, setSelectedMovie] useState(null);

    if (selectedMovie) {
        return <movieView movie = {selectedMovie} />;
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
}