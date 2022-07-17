import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from './Pagination';
import * as CONSTANTS from './SearchMovies.constants';

describe('Pagination', () => {
  it('should disable previous button on first page result', () => {
    const previousMock = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        next={() => {}}
        previous={previousMock}
      />
    );

    userEvent.click(screen.getByRole('button', { name: CONSTANTS.PREVIOUS }));

    expect(screen.getByText(CONSTANTS.PREVIOUS)).toBeDisabled();
    expect(previousMock).not.toHaveBeenCalled();
  });

  it('should disable next button on last page result', () => {
    const nextMock = jest.fn();

    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        next={nextMock}
        previous={() => {}}
      />
    );

    userEvent.click(screen.getByRole('button', { name: CONSTANTS.NEXT }));

    expect(screen.getByText(CONSTANTS.NEXT)).toBeDisabled();
    expect(nextMock).not.toHaveBeenCalled();
  });

  it('should be able to click the next button as not on the last page', () => {
    const nextMock = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        next={nextMock}
        previous={() => {}}
      />
    );

    userEvent.click(screen.getByRole('button', { name: CONSTANTS.NEXT }));

    expect(nextMock).toHaveBeenCalled();
  });

  it('should be able to click the previous button as not on the first page', () => {
    const previousMock = jest.fn();

    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        next={() => {}}
        previous={previousMock}
      />
    );

    userEvent.click(screen.getByRole('button', { name: CONSTANTS.PREVIOUS }));

    expect(previousMock).toHaveBeenCalled();
  });

  it('should not be able to click the previous or next button as their are no results', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={0}
        next={() => {}}
        previous={() => {}}
      />
    );

    expect(screen.getByText(CONSTANTS.PREVIOUS)).toBeDisabled();
    expect(screen.getByText(CONSTANTS.NEXT)).toBeDisabled();
  });
});
