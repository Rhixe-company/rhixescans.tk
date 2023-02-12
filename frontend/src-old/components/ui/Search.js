import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`?keyword=${keyword}`);
    }
    window.location.reload();
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex mt-3" role="search">
      <Form.Group controlId="search">
        <Form.Control
          onChange={(e) => setKeyword(e.target.value)}
          name="q"
          className="form-control me-2"
          type="search"
          placeholder="Search Comics....."
        ></Form.Control>
      </Form.Group>

      <Button className="btn btn-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default Search;
