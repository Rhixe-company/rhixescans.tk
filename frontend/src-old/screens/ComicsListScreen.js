import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Button, Table, Container, Image, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ComicForm from "../components/ComicForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { listComics, deleteComic, createComic } from "../actions/comicsActions";
import { COMICS_CREATE_RESET } from "../constants/comicsConstants";

const ComicsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, comics, pages, page, comics_count } = useSelector(
    (state) => state.comics
  );
  const comicDelete = useSelector((state) => state.comicDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = comicDelete;

  const comicCreate = useSelector((state) => state.comicCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    comic: createdComic,
  } = comicCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch({ type: COMICS_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/comic/${createdComic.id}/edit`);
    } else {
      dispatch(listComics(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdComic,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this comic?")) {
      dispatch(deleteComic(id));
    }
  };

  const createComicHandler = () => {
    dispatch(createComic());
  };

  return (
    <Container fluid>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container fluid>
          <Row>
            <div>
              <ComicForm createComicHandler={createComicHandler} />
            </div>
            <Col>
              <b>{comics_count} comics available</b>
              <Table
                className="table table-striped text-default"
                striped
                bordered
                hover
                size="sm"
                responsive="sm"
              >
                <thead className="text-default">
                  <tr className="text-default">
                    <th>TITLE</th>
                    <th>IMAGE</th>
                    <th>ALTERNATIVETITLE</th>

                    <th>ARTIST</th>

                    <th>AUTHOR</th>
                    <th />
                    <th />
                  </tr>
                </thead>

                <tbody className="text-default">
                  {comics?.map((comic) => (
                    <tr className="text-default" key={comic.id}>
                      <td>
                        <Link
                          className="btn btn-sm text-default"
                          to={`/comic/${comic.id}/`}
                        >
                          <strong>{comic.title}</strong>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/comic/${comic.id}/`}>
                          <Image fluid src={comic.image} alt={comic.image} />
                        </Link>
                      </td>

                      <td>
                        <span className="text-default">
                          {" "}
                          {comic.alternativetitle}
                        </span>
                      </td>

                      <td>
                        <span className="text-default"> {comic.artist}</span>
                      </td>

                      <td>
                        <span className="text-default"> {comic.author}</span>
                      </td>
                      <td>
                        <LinkContainer
                          className="text-default"
                          to={`/admin/comic/${comic.id}/edit`}
                        >
                          <Button variant="dark" className="btn-sm">
                            <FaEdit className="fas fa-edit" />
                          </Button>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="btn btn-sm"
                          onClick={() => deleteHandler(comic.id)}
                        >
                          <FaTrash className="fas fa-trash" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ComicsListScreen;
