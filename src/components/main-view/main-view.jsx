import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

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
      The List is Really Empty
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default MainView;
