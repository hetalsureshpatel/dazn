import SearchMovies from '../SearchMovies';

import './app.scss';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>DAZN Coding Challenge</h1>
        <p>Using the Movie DB to create search of movies</p>
      </header>
      <div>
        <SearchMovies />
      </div>
    </div>
  );
}

export default App;
