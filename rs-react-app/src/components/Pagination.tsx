import React from 'react';
import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  goToPage,
  prevPage,
  nextPage,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        🠔
      </button>

      {pageNumbers.map((num, index) =>
        typeof num === 'number' ? (
          <button
            key={index}
            onClick={() => goToPage(num)}
            className={`${styles.pageButton} ${
              currentPage === num ? styles.activePage : ''
            }`}
          >
            {num}
          </button>
        ) : (
          <span key={index} style={{ padding: '0 6px' }}>
            …
          </span>
        )
      )}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        🠖
      </button>
    </div>
  );
};

export default React.memo(Pagination);
