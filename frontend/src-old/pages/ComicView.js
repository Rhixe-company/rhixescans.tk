import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../actions/comicsActions";
import { bookmarkComic, LikeComic } from "../actions/bookmarkActions";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import {
  Button,
  Container,
  Image,
  NavDropdown,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaBookmark,
  FaHeart,
  FaUserCheck,
  FaHeartBroken,
} from "react-icons/fa";

const ComicView = ({ match, history }) => {
  const comicId = match.params.id;
  const pageNumber = history.location.search;
  const dispatch = useDispatch();
  const { comic, error, loading, chapters } = useSelector(
    (state) => state.comic
  );
  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    success: successBookmark,
  } = comicsBookmark;

  const comicBookmarkLike = useSelector((state) => state.comicBookmarkLike);
  const {
    result,
    error: errorLike,
    loading: loadingLike,
    success: successLike,
  } = comicBookmarkLike;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (successBookmark) {
      window.location.reload();
    }
    if (successLike) {
      window.location.reload();
    }
    dispatch(listComicDetails(comicId, pageNumber));
  }, [
    history,
    userInfo,
    dispatch,
    comicId,
    successBookmark,
    pageNumber,
    successLike,
    result,
  ]);

  function bookmarkHandler(e) {
    e.preventDefault();
    dispatch(bookmarkComic(match.params.id));
  }

  function likeHandler(e) {
    e.preventDefault();
    dispatch(LikeComic(match.params.id));
  }

  return (
    <Fragment>
      {loadingBookmark && <Loader />}
      {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
      {loadingLike && <Loader />}
      {errorLike && <Message variant="danger">{errorLike}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container fluid>
          <Row className="row">
            <Col className="col-md-4">
              <Image
                fluid
                className="thumbnail"
                src={comic?.image}
                alt={comic?.image}
              />
            </Col>
            <Col className="col-md-8">
              <h3>{comic?.title}</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Alternativetitle:</strong> {comic?.alternativetitle}
                </li>
                <li className="list-group-item">
                  <Rating
                    value={comic?.rating}
                    text={`Rating: ${comic?.rating} `}
                    color={"#f8e825"}
                  />
                </li>
                <li className="list-group-item">
                  <Nav className="ml-auto">
                    <NavDropdown title="Genres" id="genres">
                      {comic?.genres?.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`}>
                          <NavDropdown.Item>{item.name}</NavDropdown.Item>
                        </Link>
                      ))}
                    </NavDropdown>
                  </Nav>
                </li>
                <li className="list-group-item">
                  <strong>Artist:</strong> {comic?.artist}
                </li>
                <li className="list-group-item">
                  <strong>Published Date:</strong>{" "}
                  {new Date(comic?.created).toLocaleString("en-US")}
                </li>
                <li className="list-group-item">
                  <strong>Author:</strong> {comic?.author}
                </li>
                <li className="list-group-item">
                  <strong>Category:</strong>
                  {comic?.category?.map((item) => (
                    <Link key={item.id} to={`/category/${item.id}`}>
                      <Button
                        className="btn btn-sm btn-default"
                        variant="secondary"
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong> {comic?.status}
                </li>
                <li className="list-group-item">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(comic?.updated).toLocaleString("en-US")}
                </li>

                <li className="list-group-item">
                  <strong>Released:</strong> {comic?.released}
                </li>
              </ul>
            </Col>
          </Row>
          <Container>
            {userInfo ? (
              <Col className="d-flex justify-content-between">
                {comic?.favourites?.length > 0 ? (
                  <Link
                    className="btn btn-danger btn-sm"
                    onClick={bookmarkHandler}
                  >
                    <FaUserCheck />
                  </Link>
                ) : (
                  <Link
                    className="btn btn-default btn-sm"
                    onClick={bookmarkHandler}
                  >
                    <FaBookmark />
                  </Link>
                )}
                {comic?.likes?.length > 0 ? (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link
                      onClick={likeHandler}
                      className="btn btn-danger btn-sm"
                    >
                      <FaHeartBroken />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link
                      className="btn btn-default btn-sm"
                      onClick={likeHandler}
                    >
                      <FaHeart />
                    </Link>
                  </div>
                )}
              </Col>
            ) : (
              <div className="d-flex justify-content-between">
                {comic?.favourites?.length > 0 ? (
                  <Link to="/login" className="btn btn-danger btn-sm">
                    <FaUserCheck />
                  </Link>
                ) : (
                  <Link className="btn btn-default btn-sm" to="/login">
                    <FaBookmark />
                  </Link>
                )}
                {comic?.likes?.length > 0 ? (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link to="/login" className="btn btn-danger btn-sm">
                      <FaHeartBroken />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link className="btn btn-default btn-sm" to="/login">
                      <FaHeart />
                    </Link>
                  </div>
                )}
              </div>
            )}
            <Row className="well">
              <b>Plot:</b>
              <p> {comic?.description}</p>
            </Row>
            {chapters?.length > 0 ? (
              <ul className="list-group">
                <h3>Total Chapters: {chapters?.length}</h3>
                {chapters?.map((chapter) => (
                  <li key={chapter.id} className="list-group-item">
                    <Link
                      className="btn btn-default"
                      to={`/chapter/${chapter.id}/`}
                    >
                      {chapter.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <small className="text-white text-center">No Chapter Found</small>
            )}
          </Container>
        </Container>
      )}
    </Fragment>
  );
};

export default ComicView;
