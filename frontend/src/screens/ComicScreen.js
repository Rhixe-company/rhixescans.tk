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
  NavDropdown,
  Nav,
} from "react-bootstrap";
import Rating from "../components/utils/Rating";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import { listComicDetails } from "../actions/comicsActions";

import { bookmarkComic, LikeComic } from "../actions/bookmarkActions";
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
    result,
    error: errorLike,
    loading: loadingLike,
    success: successLike,
  } = comicBookmarkLike;

  useEffect(() => {
    if (userInfo) {
      if (successBookmark) {
        dispatch(listComicDetails(comicId, pageNumber));
        dispatch(listComicDetails(comicId, pageNumber));
      } else {
        dispatch(listComicDetails(comicId, pageNumber));
      }
      if (successLike) {
        dispatch(listComicDetails(comicId, pageNumber));
      } else {
        dispatch(listComicDetails(comicId, pageNumber));
      }
    }
  }, [
    comicId,
    dispatch,
    match,
    pageNumber,
    successBookmark,
    successLike,
    userInfo,
  ]);

  const bookmarkHandler = (e) => {
    e.preventDefault();
    dispatch(bookmarkComic(match.params.id));
  };

  const likeHandler = (e) => {
    e.preventDefault();
    dispatch(LikeComic(match.params.id));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadingBookmark && <Spinner />}
      {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
      {loadingLike && <Spinner />}
      {errorLike && <Message variant="danger">{errorLike}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image
                fluid
                className="thumbnail"
                src={comic?.image}
                alt={comic?.image}
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
                  <Nav className="ml-auto">
                    <NavDropdown title="Genres" id="genres">
                      {comic?.genres?.map((item) => (
                        <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                          <NavDropdown.Item>{item.name}</NavDropdown.Item>
                        </LinkContainer>
                      ))}
                    </NavDropdown>
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
                  {comic?.favourites?.length > 0 ? (
                    <Button
                      className="btn btn-danger btn-sm"
                      onClick={bookmarkHandler}
                    >
                      <FaUserCheck />
                    </Button>
                  ) : (
                    <Button
                      className="btn btn-default btn-sm"
                      onClick={bookmarkHandler}
                    >
                      <FaBookmark />
                    </Button>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {comic?.likes?.length > 0 && result > 0 ? (
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
                        <FaHeartBroken />
                      </Button>
                    </div>
                  ) : (
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
                        <FaHeart />
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
              {chapters?.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}

              <ListGroup variant="flush">
                {chapters?.map((chapter) => (
                  <ListGroup.Item key={chapter.id}>
                    <Link to={`/chapter/${chapter.id}/`}>{chapter.name}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ComicScreen;