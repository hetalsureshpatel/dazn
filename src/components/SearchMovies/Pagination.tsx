interface PaginationProps {
  next: () => void;
  previous: () => void;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  next,
  previous,
  currentPage,
  totalPages,
}: PaginationProps) {
  const isNextEnabled = currentPage < totalPages;
  const isPreviousEnabled = currentPage > 1;

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={!isPreviousEnabled}
        onClick={
          isPreviousEnabled
            ? () => {
                previous();
              }
            : undefined
        }
      >
        Previous
      </button>
      <button
        type="button"
        disabled={!isNextEnabled}
        onClick={
          isNextEnabled
            ? () => {
                next();
              }
            : undefined
        }
      >
        Next
      </button>
    </div>
  );
}
