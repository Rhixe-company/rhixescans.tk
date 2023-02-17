import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Nav,
  Container,
} from "react-bootstrap";
import Rating from "../components/utils/Rating";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import { listComicDetails } from "../actions/comicsActions";

import { LikeComic, bookmarkComic } from "../actions/bookmarkActions";
import {
  FaBookmark,
  FaHeart,
  FaUserCheck,
  FaHeartBroken,
} from "react-icons/fa";
function ComicScreen({ match, history }) {
  const comicId = match.params.id;
  const pageNumber = history.location.search;
  const dispatch = useDispatch();
  const { comic, error, loading, chapters } = useSelector(
    (state) => state.comic
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    success: successBookmark,
  } = comicsBookmark;

  const comicBookmarkLike = useSelector((state) => state.comicBookmarkLike);
  const {
    error: errorLike,
    loading: loadingLike,
    success: successLike,
  } = comicBookmarkLike;

  useEffect(() => {
    dispatch(listComicDetails(comicId, pageNumber));
  }, [
    comicId,
    dispatch,
    match,
    pageNumber,
    userInfo,
    history,
    successBookmark,
    successLike,
  ]);

  const bookmarkHandler = (e) => {
    e.preventDefault();
    dispatch(bookmarkComic(match.params.id));
    dispatch(listComicDetails(comicId, pageNumber));
  };

  const likeHandler = (e) => {
    e.preventDefault();
    dispatch(LikeComic(match.params.id));
    dispatch(listComicDetails(comicId, pageNumber));
  };
  const fav = comic?.favourites;
  const lik = comic?.likes;
  return (
    <React.Fragment>
      {loading && <Spinner />}
      {error && (
        <>
          <Message variant="danger">{error}</Message>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </>
      )}

      <Container fluid>
        <Row>
          <Col md={6}>
            <Image
              fluid
              className="thumbnail"
              src={comic?.images}
              alt={comic?.images}
            />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{comic?.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Alternativetitle:</strong> {comic?.alternativetitle}
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={comic?.rating}
                  text={`Rating: ${comic?.rating} `}
                  color={"#f8e825"}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>About:</strong> {comic?.description}
              </ListGroup.Item>

              <ListGroup.Item>
                <Nav className="d-flex justify-content-between align-items-center">
                  <strong>Genres:</strong>
                  {comic?.genres?.map((item) => (
                    <Nav.Link key={item.id}>
                      <LinkContainer to={`/genre/${item.id}`}>
                        <div> {item.name}</div>
                      </LinkContainer>
                    </Nav.Link>
                  ))}
                </Nav>
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Artist:</strong> {comic?.artist}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Published Date:</strong>{" "}
                {new Date(comic?.created).toLocaleString("en-US")}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Author:</strong> {comic?.author}
              </ListGroup.Item>
              <ListGroup.Item>
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
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Status:</strong> {comic?.status}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Last Updated:</strong>{" "}
                {new Date(comic?.updated).toLocaleString("en-US")}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Released:</strong> {comic?.released}
              </ListGroup.Item>

              <ListGroup.Item>
                {loadingBookmark && <Spinner />}
                {errorBookmark && (
                  <Message variant="danger">{errorBookmark}</Message>
                )}

                {fav?.length === 0 && (
                  <Button
                    className="btn btn-default btn-sm"
                    onClick={bookmarkHandler}
                  >
                    Add
                    <FaBookmark />
                  </Button>
                )}
                {fav?.length > 0 && fav?.length === 1 && (
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={bookmarkHandler}
                  >
                    Remove
                    <FaUserCheck />
                  </Button>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                {loadingLike && <Spinner />}
                {errorLike && <Message variant="danger">{errorLike}</Message>}
                {lik?.length === 0 && (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Button
                      className="btn btn-default btn-sm"
                      onClick={likeHandler}
                    >
                      Like
                      <FaHeart />
                    </Button>
                  </div>
                )}
                {lik?.length > 0 && lik?.length === 1 && (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Button
                      onClick={likeHandler}
                      className="btn btn-danger btn-sm"
                    >
                      Unlike
                      <FaHeartBroken />
                    </Button>
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h4>Chapters</h4>
            {chapters?.length === 0 &&
              comic?.numChapters === chapters?.length && (
                <Message variant="info">No Chapters</Message>
              )}

            <ListGroup variant="flush">
              {chapters?.map((chapter) => (
                <ListGroup.Item key={chapter.id}>
                  <Link to={`/chapter/${chapter.id}/`}>
                    <h3>{chapter.name}</h3>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ComicScreen;
