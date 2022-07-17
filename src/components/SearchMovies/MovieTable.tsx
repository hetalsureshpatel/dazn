export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_id: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieTableProps {
  movies: Array<Movie>;
  error?: string;
}

export default function MovieTable({ movies, error }: MovieTableProps) {
  let rows;

  if (error) {
    rows = (
      <tr>
        <td colSpan={2} className="text-center text-error">
          {error}
        </td>
      </tr>
    );
  } else if (movies.length === 0) {
    rows = (
      <tr>
        <td colSpan={2} className="text-center">
          No data
        </td>
      </tr>
    );
  } else {
    rows = movies.map((movie) => {
      return (
        <tr key={movie.id}>
          <td>{movie.title}</td>
          <td>{movie.release_date}</td>
        </tr>
      );
    });
  }

  return (
    <table className="movie-table">
      <thead>
        <tr>
          <th>Movie Name</th>
          <th>release</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
