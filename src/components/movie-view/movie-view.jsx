import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          src={movie.ImagePath}
          style={{ width: "250px", height: "350px" }}
        />
      </div>
      <div>
        <span> Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
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
