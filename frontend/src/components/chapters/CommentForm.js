import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CommentForm = ({ submitHandler, loadingchapterReview }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          row="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button disabled={loadingchapterReview} type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
