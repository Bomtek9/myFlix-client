import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, token, user, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      setIsFavorite(user.FavoriteMovies.includes(movie._id));
    }
  }, [user, movie._id]);

  const handleFavoriteClick = () => {
    if (!user || !user.FavoriteMovies) {
      console.error("User is not defined or does not have FavoriteMovies.");
      return;
    }

    if (isFavorite) {
      removeFavoriteMovie();
    } else {
      addFavoriteMovie();
    }
  };

  const addFavoriteMovie = () => {
    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.Username}/favorites/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add favorite movie");
        }
      })
      .then((updatedUser) => {
        if (updatedUser && updatedUser.FavoriteMovies) {
          alert("Successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsFavorite(true);
        } else {
          console.error("Invalid user data received.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.Username}/favorites/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove favorite movie");
        }
      })
      .then((updatedUser) => {
        if (updatedUser && updatedUser.FavoriteMovies) {
          alert("Successfully removed from favorites");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsFavorite(false);
        } else {
          console.error("Invalid user data received.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="shadow p-4 border-0 h-100">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img className="m-2" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button className="more-info-button">More Info</Button>
          </Link>
          <div className="favorite-btn">
            <Button className="fav-btn" onClick={handleFavoriteClick}>
              {isFavorite ? "- Remove" : "+ Favorite"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func,
  token: PropTypes.string,
};

export default MovieCard;
