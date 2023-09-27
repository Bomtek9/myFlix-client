export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span> Name: </span>
          <span>{movie.name}</span>
        </div>
        <div>
          <span> Genre: </span>
          <span>{genre.name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
      <button onClick={onBackClick}>Back</button>
    </div>
    );
  };