import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        style={{ width: "200px", height: "300px" }}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {/* <Card.Text>{movie.Description}</Card.Text> */}
        <Button onClick={() => onMovieClick(movie)} variant="link">
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
