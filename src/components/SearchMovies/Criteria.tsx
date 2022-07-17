import React, { useRef } from 'react';
import * as CONSTANTS from './SearchMovies.constants';

export interface CriteriaProps {
  search: (term: string) => void;
}

function Criteria({ search }: CriteriaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="criteria"
      onKeyUp={(e) => {
        // Handle enter key to perform search.
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
          search(inputRef.current.value);
        }
      }}
    >
      <input
        type="text"
        ref={inputRef}
        placeholder={CONSTANTS.SEARCH_PLACEHOLDER}
      />
      <button
        type="button"
        onClick={() => {
          if (inputRef.current && inputRef.current.value) {
            search(inputRef.current.value);
          }
        }}
      >
        Search
      </button>
    </div>
  );
}

export default React.memo(Criteria);
