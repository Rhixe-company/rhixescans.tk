import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { Image } from "react-bootstrap";
const Chapter = ({ chapter, comic }) => {
  return (
    <div>
      <Link to={`/comic/${comic?.id}/`}>
        <span>{comic?.title}</span>
      </Link>
      <br />
      <Link to={`/chapter/${chapter?.id}/`}>
        <span>{chapter?.name}</span>
      </Link>
      <br />
      {chapter?.pages?.map((Page, index) => (
        <InfiniteScroll
          key={index}
          dataLength={chapter?.pages?.length}
          loader={<Loader />}
        >
          <Image fluid className="pages" src={Page.images} />
        </InfiniteScroll>
      ))}
      <br />
      <Link to={`/comic/${comic?.id}/`}>
        <span>{comic?.title}</span>
      </Link>
      <br />
      <Link to={`/chapter/${chapter?.id}/`}>
        <span>{chapter?.name}</span>
      </Link>
    </div>
  );
};

export default Chapter;
