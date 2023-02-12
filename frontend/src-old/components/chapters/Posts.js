import React from "react";
import Rating from "../Rating";
import { ListGroup } from "react-bootstrap";
import Message from "../Message";
const Posts = ({ comments }) => {
  return (
    <div>
      <h2>Comments</h2>
      {comments?.length === 0 && <Message>No Comments</Message>}
      <ListGroup variant="flush">
        {comments?.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <strong>{comment.user.username}</strong>
            <Rating value={comment.rating} />
            <p>{comment.created.substring(0, 10)}</p>
            <p>{comment.text}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Posts;
