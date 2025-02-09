import './Pagination.css';

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
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            className={`page-item ${currentPage === number ? 'active' : ''}`}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            <button className="pagelink">{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
