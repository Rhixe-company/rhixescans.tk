import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
function UserListScreen({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container fluid>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          className="table table-striped table-sm text-white"
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className="text-white" key={user.id}>
                <td>
                  <span className="text-white"> {user.id}</span>
                </td>
                <td>
                  <span className="text-white"> {user.user_name}</span>
                </td>
                <td>
                  <span className="text-white">{user.email}</span>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaCheck style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer
                    className="text-white"
                    to={`/admin/user/${user.id}/edit`}
                  >
                    <Button variant="dark" className="btn-sm">
                      <FaEdit className="fas fa-edit" />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <FaTrash className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default UserListScreen;
