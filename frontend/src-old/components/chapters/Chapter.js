import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Image } from "react-bootstrap";
const Chapter = ({ chapter, comic }) => {
  return (
    // <div>
    //   <Link to={`/comic/${comic?.id}/`}>
    //     <span>{comic?.title}</span>
    //   </Link>
    //   <br />
    //   <Link to={`/chapter/${chapter?.id}/`}>
    //     <span>{chapter?.name}</span>
    //   </Link>
    //   <br />
    //   {chapter?.pages?.map((Page, index) => (
    //     <InfiniteScroll
    //       key={index}
    //       dataLength={chapter?.pages?.length}
    //       loader={<Loader />}
    //     >
    //       <Image fluid className="pages" src={Page.image} />
    //     </InfiniteScroll>
    //   ))}
    //   <br />
    //   <Link to={`/comic/${comic?.id}/`}>
    //     <span>{comic?.title}</span>
    //   </Link>
    //   <br />
    //   <Link to={`/chapter/${chapter?.id}/`}>
    //     <span>{chapter?.name}</span>
    //   </Link>
    // </div>
    <Fragment>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to={`/comic/${comic?.id}/`}>
            {comic?.title}
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>

        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            role="button"
            to={`/chapter/${chapter?.id}/`}
            aria-haspopup="true"
            aria-expanded="false"
          >
            {chapter?.name}
          </Link>

          <div className="dropdown-menu">
            {chapter?.comic?.chapters?.map((chapter) => (
              <Fragment key={chapter?.id}>
                <Link className="dropdown-item" to={`/chapter/${chapter?.id}/`}>
                  {chapter?.name}
                </Link>

                <div className="dropdown-divider"></div>
              </Fragment>
            ))}
          </div>
        </li>
      </ul>

      {chapter?.pages?.map((page) => (
        <div key={page.id} className="pages">
          <img src={page.image} alt={page.image_urls} />
        </div>
      ))}
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to={`/comic/${comic?.id}/`}>
            {comic?.title}
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>

        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            role="button"
            to={`/chapter/${chapter?.id}/`}
            aria-haspopup="true"
            aria-expanded="false"
          >
            {chapter?.name}
          </Link>

          <div className="dropdown-menu">
            {chapter?.comic?.chapters?.map((chapter) => (
              <Fragment key={chapter?.id}>
                <Link className="dropdown-item" to={`/chapter/${chapter?.id}/`}>
                  {chapter?.name}
                </Link>

                <div className="dropdown-divider"></div>
              </Fragment>
            ))}
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

export default Chapter;
