import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  console.log(movieId);

  return (
    <Card className="shadow p-4 border-0">
      <Row>
        <Col md="4" style={{ marginTop: 10, marginBottom: 10 }}>
          <Card.Img className="ImagePath" src={movie.ImagePath} alt="" />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title className="mt-2">{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Text>
              <span className="text-title">Genre:</span> {movie.Genre.Name}
            </Card.Text>
            <Card.Text>
              <span className="text-title">Director:</span>{" "}
              {movie.Director.Name}
            </Card.Text>
            <Link to="/movies">
              <Button className="close-open-btn">Back</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
