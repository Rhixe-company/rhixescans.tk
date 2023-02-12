import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
const LoginView = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <FormContainer>
      <h1>
        <FaSignInAlt />
      </h1>
      <Form onSubmit={loginUser}>
        <Form.Group controlId="email">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New User?
          <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginView;
