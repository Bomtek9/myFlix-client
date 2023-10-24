import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import NavbarComponent from "../navbar/navbar";

import "./main-view.scss";

const handleLogout = () => {
  setUser(null);
  setToken(null);
  localStorage.clear();
};

const handleLoggedIn = (user, token) => {
  setUser(user);
  setToken(token);
};

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;

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
  }, [token]);

  const getSearchedMovies = (arr, query) => {
    return arr.filter((movie) => {
      return movie.Title.toLowerCase().includes(query.toLowerCase());
    });
  };

  useEffect(() => {
    setFilteredMovies(getSearchedMovies(movies, search));
  }, [search, movies]);

  return (
    <Container>
      <NavbarComponent user={user} onLoggedOut={handleLogout} />

      <Row className="justify-content-center mb-5">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/movies" />
                ) : (
                  <LoginView onLoggedIn={handleLoggedIn} />
                )
              }
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/movies" /> : <SignupView />}
            />
            <Route
              path="/movies"
              element={
                <MoviesGrid filteredMovies={filteredMovies} token={token} />
              }
            />
            <Route
              path="/movies/:movieId"
              element={<MovieView movies={movies} />}
            />
            <Route
              path="/profile"
              element={
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  setUser={setUser}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </Row>
    </Container>
  );
};

const MoviesGrid = ({ filteredMovies, token, setUser, user }) => (
  <Row xs={1} md={2} lg={4} className="g-4">
    {filteredMovies.map((movie) => (
      <Col key={movie._id}>
        <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
      </Col>
    ))}
  </Row>
);

// Add your PropTypes, styling, and other code as needed
