import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
function SearchBox({ history }) {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`?keyword=${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Group controlId="search">
          <Form.Control
            onChange={(e) => setKeyword(e.target.value)}
            name="q"
            type="search"
            placeholder="Search Comics....."
            className="form-control"
          ></Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          <FaSearch />
        </Button>
      </Form>
    </FormContainer>
  );
}

export default SearchBox;
