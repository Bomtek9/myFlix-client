import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card, Col } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Col style={{ marginTop: 10, marginBottom: 10 }}>
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} className="img-style" />
        <Card.Body>
          {/* <Card.Title>{movie.Title}</Card.Title> */}
          {/* <Card.Text>{movie.Description}</Card.Text> */}
          <button
            onClick={() => onMovieClick(movie)}
            variant="link"
            className="more-info-button"
          >
            More Info
          </button>
        </Card.Body>
      </Card>
    </Col>
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
