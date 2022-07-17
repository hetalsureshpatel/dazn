import Criteria from './Criteria';

import './search-movies.scss';

export default function SearchMovies() {
  return (
    <div className="search-movies">
      <Criteria
        search={(term) => {
          console.log(`%c term: ${term}`, 'color: cyan;');
        }}
      />
    </div>
  );
}
