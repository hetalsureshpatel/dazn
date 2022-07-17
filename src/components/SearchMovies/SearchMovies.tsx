import { rejects } from 'assert';
import { useEffect, useReducer } from 'react';
import Criteria from './Criteria';

import './search-movies.scss';

interface Movie {
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

interface SearchResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
}
interface State {
  movies: Array<Movie>;
  page: number;
  totalPages: number;
  term: string;
  isLoading: boolean;
  error?: string;
}

type Action =
  | { type: 'search'; term: string }
  | { type: 'success'; response: SearchResponse }
  | { type: 'failure'; error: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'search':
      return { ...state, isLoading: true, page: 1, term: action.term };

    case 'success':
      return {
        ...state,
        isLoading: false,
        page: action.response.page,
        totalPages: action.response.total_pages,
        movies: action.response.results,
      };

    case 'failure':
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

const initialState: State = {
  movies: [],
  page: 0,
  totalPages: 0,
  isLoading: false,
  term: '',
  error: '',
};

export default function SearchMovies() {
  const [{ isLoading, term, page, movies }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Preform search.
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      if (isLoading && term) {
        try {
          const url = `https://api.themoviedb.org/3/search/movie?api_key=4cd6881c543fe1c75704bd114351709f&language=en-GB&query=${encodeURIComponent(
            term
          )}&page=${page}&include_adult=false`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'content-type': 'application/json;charset=UTF-8',
            },
            signal: controller.signal,
          });

          const data: SearchResponse = await response.json();

          dispatch({ type: 'success', response: data });
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            dispatch({ type: 'failure', error: 'Sorry something went wrong' });
          }
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [isLoading, term, page]);

  return (
    <div className="search-movies">
      <Criteria
        search={(term) => {
          dispatch({ type: 'search', term });
        }}
      />
    </div>
  );
}
