import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { LinkContainer } from "react-router-bootstrap";
import { deleteChapter } from "../actions/chaptersActions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
function ProfileScreen({ history }) {
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user, chapters } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const chapterDelete = useSelector((state) => state.chapterDelete);
  const { loading: loadingDelete, error: errorDelete } = chapterDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.user_name || success || userInfo.id !== user.id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo.id));
      } else {
        setUsername(user.user_name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          user_name: user_name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {loadingDelete && <Spinner />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Spinner />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="username"
              placeholder="Enter username"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>Chapters List</h1>
        <div>
          <Table
            className="table table-striped text-white"
            striped
            bordered
            hover
            size="sm"
            responsive="sm"
          >
            <thead className="text-white">
              <tr className="text-white">
                <th>ComicId</th>
                <th>Name</th>
                <th>Pages</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="text-white">
              {chapters?.map((chapter) => (
                <tr className="text-white" key={chapter.id}>
                  <td>
                    <Link
                      className="text-white btn btn-sm"
                      to={`/comic/${chapter.comic}/`}
                    >
                      <span className="text-white">{chapter.comic}</span>
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="text-white btn btn-sm"
                      to={`/chapter/${chapter.id}/`}
                    >
                      <span className="text-white">{chapter.name}</span>
                    </Link>
                  </td>
                  <td>
                    <span className="text-white">{chapter.numPages}</span>
                  </td>

                  <td>
                    <LinkContainer
                      className="text-white "
                      to={`/admin/chapter/${chapter.id}/edit`}
                    >
                      <Button variant="dark" className="btn-sm">
                        <FaEdit className="fas fa-edit" />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(chapter.id)}
                    >
                      <FaTrash className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
