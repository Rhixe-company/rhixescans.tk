import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChapterPaginate from "../ChapterPaginate";

function Chapters({ chapters, chapters_count, page, pages }) {
  return (
    <div>
      <strong>{chapters_count} chapters available</strong>
      {chapters?.map((post) => (
        <ListGroup key={post.id}>
          <ListGroup.Item>
            <Link to={`/chapter/${post.id}/`}>
              <span>{post.name}</span>
            </Link>
          </ListGroup.Item>
        </ListGroup>
      ))}
      <ChapterPaginate pages={pages} page={page} isAdmin={false} />
    </div>
  );
}

export default Chapters;
