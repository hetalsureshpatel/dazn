import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Criteria from './Criteria';
import * as CONSTANTS from './SearchMovies.constants';

describe('Criteria', () => {
  it('should perform search on click as user has entered a search term', () => {
    const searchMock = jest.fn();

    render(<Criteria search={searchMock} />);

    userEvent.type(
      screen.getByPlaceholderText(CONSTANTS.SEARCH_PLACEHOLDER),
      'test 123'
    );

    userEvent.click(screen.getByRole('button'));

    expect(searchMock).toHaveBeenCalledWith('test 123');
  });

  it('should not perform search on click as user has not entered a search term', () => {
    const searchMock = jest.fn();

    render(<Criteria search={searchMock} />);

    userEvent.click(screen.getByRole('button'));

    expect(searchMock).not.toHaveBeenCalled();
  });

  it('should perform search on enter as user has entered a search term', () => {
    const searchMock = jest.fn();

    render(<Criteria search={searchMock} />);

    userEvent.type(
      screen.getByPlaceholderText(CONSTANTS.SEARCH_PLACEHOLDER),
      'test 123'
    );

    userEvent.keyboard('{Enter}');

    expect(searchMock).toHaveBeenCalledWith('test 123');
  });

  it('should not perform search on enter as user has not entered a search term', () => {
    const searchMock = jest.fn();

    render(<Criteria search={searchMock} />);

    userEvent.click(screen.getByRole('button'));

    expect(searchMock).not.toHaveBeenCalled();
  });
});
