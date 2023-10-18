import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import "./main-view.scss";
import {
  Button,
  Row,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
} from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;
    {
      // Fetch movies only when a token is available
      fetch("https://dup-movies-18ba622158fa.herokuapp.com/movies", {
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
      <Col md={3}>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </Col>
    );
  }

  if (!user) {
    return <LoginView onLoggedIn={handleLogin} />;
  }

  if (selectedMovie) {
    return (
      <div>
        <Col md={4}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      </div>
    );
  }

  if (movies.length > 0) {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken("");
          }}
          className="logout-button"
        >
          Logout
        </button>
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
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
          className = "logout-button";
        }}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

export default MainView;
