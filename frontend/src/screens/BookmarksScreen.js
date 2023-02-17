import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  bookmarkComic,
  bookmarkComicList,
  // addToBookmark,
  // removeFromBookmark,
} from "../actions/bookmarkActions";
import Spinner from "../components/ui/Spinner";
import Rating from "../components/utils/Rating";
import Message from "../components/utils/Message";

import {
  Card,
  ListGroup,
  Button,
  Nav,
  NavDropdown,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
const BookmarksScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    success: successBookmark,
  } = comicsBookmark;

  const comicBookmarkList = useSelector((state) => state.comicBookmarkList);
  const { error, loading, success, comics } = comicBookmarkList;

  useEffect(() => {
    if (userInfo) {
      dispatch(bookmarkComicList());
    } else {
      history.push("/login");
    }
  }, [history, userInfo, dispatch, success, successBookmark]);

  // const removeFromBookmarkHandler = (id) => {
  //   dispatch(removeFromBookmark(id));
  // };

  function bookmarkHandler(e) {
    e.preventDefault();
    const id = e.target.value;
    dispatch(bookmarkComic(id));
  }

  return (
    <React.Fragment>
      <Container>
        {loading && <Spinner />}
        {error && (
          <>
            <Message variant="danger">{error}</Message>
          </>
        )}
        <Row>
          {comics?.length > 0 ? (
            <Col sm={12} md={6} lg={4} xl={3}>
              {comics.map((comic) => (
                <Card key={comic.id} className="my-2 p-2 rounded">
                  <Link to={`/comic/${comic.id}`}>
                    <Card.Img className="card-img-top" src={comic.images} />
                  </Link>

                  <Card.Body>
                    <Link to={`/comic/${comic.id}`}>
                      <Card.Title as="div">
                        <h3 className="text-center">
                          {comic.title.substr(0, 50)}
                        </h3>
                      </Card.Title>
                    </Link>
                    <br />
                    <Card.Text as="div">
                      <div className="my-2">
                        <Rating
                          value={comic.rating}
                          text={`${comic.rating} rating`}
                          color={"#f8e825"}
                        />
                      </div>
                    </Card.Text>
                    <br />
                    <Card.Text>
                      {comic?.chapters?.length === 0 && (
                        <Message variant="info">No Chapters</Message>
                      )}

                      <ListGroup variant="flush">
                        {comic?.chapters?.map((chapter) => (
                          <ListGroup.Item key={chapter.id}>
                            <Link to={`/chapter/${chapter.id}/`}>
                              <h3>{chapter.name}</h3>
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer
                    className="d-flex justify-content-between align-items-center"
                    as="div"
                  >
                    <div>
                      {" "}
                      {comic?.category?.map((item) => (
                        <Link key={item.id} to={`/category/${item.id}`}>
                          Category:
                          <Button
                            className="btn btn-sm btn-info"
                            variant="secondary"
                          >
                            {item.name}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <div>
                      <Nav className="ml-auto">
                        {comic?.genres?.length === 0 ? (
                          <Message variant="info">No Genres</Message>
                        ) : (
                          <NavDropdown
                            title={
                              <>
                                <Button
                                  className="btn btn-sm btn-info"
                                  variant="secondary"
                                >
                                  Genres:
                                </Button>
                              </>
                            }
                            id="genres"
                          >
                            {comic?.genres?.map((item) => (
                              <LinkContainer
                                key={item.id}
                                to={`/genre/${item.id}`}
                              >
                                <NavDropdown.Item>{item.name}</NavDropdown.Item>
                              </LinkContainer>
                            ))}
                          </NavDropdown>
                        )}
                      </Nav>
                    </div>
                    <div>
                      {loadingBookmark && <Spinner />}
                      {errorBookmark && (
                        <>
                          <Message variant="danger">{error}</Message>
                        </>
                      )}
                      <Button
                        onClick={bookmarkHandler}
                        value={comic.id}
                        type="button"
                        variant="danger"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              ))}
            </Col>
          ) : (
            <div>
              <Link to="/" className="btn btn-light my-3">
                Go Back
              </Link>
            </div>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default BookmarksScreen;
