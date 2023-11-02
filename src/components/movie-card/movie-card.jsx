import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const MovieCard = ({ movie, token, user, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.favoriteMovies &&
      user.favoriteMovies.includes(movie._id)
    ) {
      setIsFavorite(true);
    }
  }, [user, movie._id]);

  const addFavoriteMovie = () => {
    if (!user) {
      console.error("User is not defined.");
      return;
    }

    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.Username}/favorites/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          alert("Successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsFavorite(true);
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
          alert("Failed");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          alert("Successfully removed from favorites");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsFavorite(false);
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
        <Card.Title>{movie.Title}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <div className="button-container">
              <Button className="more-info-button">More Info</Button>
            </div>
          </Link>
          <div className="favorite-btn">
            {isFavorite ? (
              <Button className="fav-btn" onClick={removeFavoriteMovie}>
                - Remove
              </Button>
            ) : (
              <Button className="fav-btn" onClick={addFavoriteMovie}>
                + Favorite
              </Button>
            )}
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
};

export default MovieCard;
