import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch movies only if a user is logged in
      fetch("https://dup-movies-18ba622158fa.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const moviesFromApi = data.map((movie) => {
              return {
                _id: movie._id.$oid,
                Description: movie.Description,
                Genre: {
                  Name: movie.Genre.Name,
                  Description: movie.Genre.Description,
                },
                Director: {
                  Name: movie.Director.Name,
                  Birth: movie.Director.Birth,
                  Death: movie.Director.Death,
                },
                ImagePath: movie.ImagePath,
                Featured: movie.Featured,
                Title: movie.Title,
              };
            });

            setMovies(moviesFromApi);
          }
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [user]);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </div>
    );
  }

  if (movies.length > 0) {
    // Render the list of movies
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
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
  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
      The List is Empty
    </div>
  );
};

export default MainView;
