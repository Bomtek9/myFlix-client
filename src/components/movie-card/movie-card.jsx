import PropTypes from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user?.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.name}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.name}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="shadow p-4 border-0 h-100">
      <Card.Img className="m-2" src={movie.ImagePath} />

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button className="more-info-button">More Info</Button>
          </Link>
          <div className="favorite-btn">
            {!isFavorite ? (
              <Button className="fav-btn" onClick={addFavoriteMovie}>
                + Favorite
              </Button>
            ) : (
              <Button className="fav-btn" onClick={removeFavoriteMovie}>
                - Remove
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
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
