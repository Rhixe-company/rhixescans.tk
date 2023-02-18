import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEdit({ match, history }) {
  const userId = match.params.id;

  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/users");
    } else {
      if (!user.user_name || user.id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setUsername(user?.user_name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [
    successUpdate,
    history,
    dispatch,
    user.user_name,
    user.id,
    user.email,
    user.isAdmin,
    userId,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, user_name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/users">Go Back</Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="user_name">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </div>
  );
}

export default UserEdit;
