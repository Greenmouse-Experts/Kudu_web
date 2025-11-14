interface SimplePaginatorProps {
  currentPage: number;
  totalPages: number;
  nextPage: string | null;
  prevPage: string | null;
  totalCount: number;
}

export default function SimplePaginator({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  totalCount,
}: SimplePaginatorProps) {
  return (
    <div
      className="flex justify-center items-center gap-4 py-4"
      data-theme="kudu"
    >
      <a
        href={prevPage || "#"}
        className={`btn btn-primary ${!prevPage ? "btn-disabled" : ""}`}
        aria-disabled={!prevPage}
      >
        Previous
      </a>
      <span className="text-lg font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <a
        href={nextPage || "#"}
        className={`btn btn-primary ${!nextPage ? "btn-disabled" : ""}`}
        aria-disabled={!nextPage}
      >
        Next
      </a>
    </div>
  );
}
