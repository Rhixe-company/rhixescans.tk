import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
const ComicForm = ({ createComicHandler }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [image_url, setImage_url] = useState("");
  const [status, setStatus] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  
  return (
    <div>
      <FormContainer>
        <Form onSubmit={createComicHandler}>
          <Form.Group controlId="name">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
            ></Form.Control>
            
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ComicForm;
