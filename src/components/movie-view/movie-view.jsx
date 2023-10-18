import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <img src={movie.ImagePath} style={{ width: "250px", height: "350px" }} />
      <div className="title">
        <span> Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div className="description">
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div className="director">
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <button
        onClick={onBackClick}
        style={{ cursor: "pointer" }}
        className="back-button"
      >
        Back
      </button>
    </div>
  );
};
