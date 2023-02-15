import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import FormContainer from "../components/utils/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [user_name, setUsername] = useState("");
  const [first_name, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        history.push("/admin/users");
      } else {
        if (!user?.user_name || user.id !== Number(userId)) {
          dispatch(getUserDetails(userId));
        } else {
          setFirstname(user.name);
          setUsername(user?.user_name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      }
    } else {
      history.push("/login");
    }
  }, [user, userId, successUpdate, history, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: user.id,
        first_name: first_name,
        user_name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <div>
      <Link to="/admin/users">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
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

            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter firstname"
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
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
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
