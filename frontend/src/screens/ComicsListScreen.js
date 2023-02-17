import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Button, Table, Container, Image, Row, Col } from "react-bootstrap";
import Spinner from "../components/ui/Spinner";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/utils/Message";
import Paginate from "../components/utils/Paginate";
import ComicForm from "../components/utils/ComicForm";
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
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: COMICS_CREATE_RESET });
      if (successCreate) {
        history.push(`/admin/comic/${createdComic.id}/edit`);
      } else {
        dispatch(listComics(keyword));
      }
    } else {
      history.push("/login");
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
      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Spinner />
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
                className="table table-striped text-white"
                striped
                bordered
                hover
                size="sm"
                responsive="sm"
              >
                <thead className="text-white">
                  <tr className="text-white">
                    <th>TITLE</th>
                    <th>IMAGE</th>
                    <th>ALTERNATIVETITLE</th>

                    <th>ARTIST</th>

                    <th>AUTHOR</th>
                    <th />
                    <th />
                  </tr>
                </thead>

                <tbody className="text-white">
                  {comics?.map((comic) => (
                    <tr className="text-white" key={comic.id}>
                      <td>
                        <Link
                          className="btn btn-sm text-white"
                          to={`/comic/${comic.id}/`}
                        >
                          <strong>{comic.title}</strong>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/comic/${comic.id}/`}>
                          <Image fluid src={comic.images} alt={comic.image} />
                        </Link>
                      </td>

                      <td>
                        <span className="text-white">
                          {" "}
                          {comic.alternativetitle}
                        </span>
                      </td>

                      <td>
                        <span className="text-white"> {comic.artist}</span>
                      </td>

                      <td>
                        <span className="text-white"> {comic.author}</span>
                      </td>
                      <td>
                        <LinkContainer
                          className="text-white"
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
