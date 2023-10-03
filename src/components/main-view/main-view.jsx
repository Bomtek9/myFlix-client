import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://dup-movies-18ba622158fa.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Log the response data
        if (Array.isArray(data.docs)) {
          const movieFromApi = data.docs.map((doc) => {
            return {
              _id: doc._id,
              Name: doc.Name,
              ImagePath: doc.ImagePath,
              Description: doc.Description,
              Genre: {
                Name: doc.Genre.Name,
                Description: doc.Genre.Description,
              },
              Director: {
                Name: doc.Director.Name,
              },
            };
          });

          setMovies(movieFromApi);
        }
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length > 0) {
    // Render the list of movies
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }

  // Handle the case when there are no movies
  return <div>The List is Really Empty</div>;
};

export default MainView;
