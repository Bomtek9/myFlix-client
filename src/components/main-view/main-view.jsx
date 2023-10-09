import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token) {
      // Fetch movies only when a token is available
      fetch("https://myflixmoviedb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMovies(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [token]);

  const handleLogin = (loggedInUser, loggedInToken) => {
    setUser(loggedInUser);
    setToken(loggedInToken);
  };

  if (!user) {
    return <LoginView onLoggedIn={handleLogin} />;
  }

  if (selectedMovie) {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken("");
            setSelectedMovie(null);
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
            setToken("");
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
          setToken("");
        }}
      >
        Logout
      </button>
      The List is Really Empty
    </div>
  );
};

export default MainView;
