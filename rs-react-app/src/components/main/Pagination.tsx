import styles from './Pagination.module.css';

type MyProps = {
  countPersons: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({ countPersons, currentPage, setCurrentPage }: MyProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countPersons / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li
            className={`${styles.pageItem} ${currentPage === number ? styles.active : ''}`}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            <button className={styles.pageLink}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
