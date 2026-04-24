"use client";

interface PaginationProps {
  /** Currently active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Label shown on the left, e.g. "Mostrando 1 a 4 de 240 unidades" */
  label?: string;
  /** Called when the user clicks a page button */
  onPageChange?: (page: number) => void;
}

/**
 * Builds a compact page list: [1] … [cur-1] [cur] [cur+1] … [last]
 * Always shows first and last page; adds ellipsis when there are gaps.
 */
function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }

  if (current < total - 2) pages.push("…");

  pages.push(total);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  label,
  onPageChange,
}: PaginationProps) {
  const pages = buildPages(currentPage, totalPages);

  return (
    <div className="table-pagination">
      {label && (
        <span className="text-label-sm text-on-surface-variant">{label}</span>
      )}

      <div className="pagination-controls">
        {/* Prev */}
        <button
          className="pagination-btn"
          disabled={currentPage <= 1}
          aria-label="Página anterior"
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {/* Page numbers */}
        {pages.map((page, idx) =>
          page === "…" ? (
            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
              …
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-btn${page === currentPage ? " pagination-btn--active" : ""}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange?.(page as number)}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          className="pagination-btn"
          disabled={currentPage >= totalPages}
          aria-label="Página siguiente"
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
