import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ postsPerPage, totalPosts, paginate, chapterId }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              onClick={() => paginate(number)}
              to={`/chapter/${chapterId}`}
              className="page-link"
              active={number}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
