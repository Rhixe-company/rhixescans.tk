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
  Container,
} from "react-bootstrap";
import Rating from "../components/utils/Rating";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import { listComicDetails } from "../actions/comicsActions";

import { LikeComic, addToBookmark } from "../actions/bookmarkActions";
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
    } else {
      history.push("/login");
    }
  }, [
    comicId,
    dispatch,
    match,
    pageNumber,
    successBookmark,
    successLike,
    userInfo,
    history,
  ]);

  const bookmarkHandler = (e) => {
    e.preventDefault();
    dispatch(addToBookmark(match.params.id));
  };

  const likeHandler = (e) => {
    e.preventDefault();
    dispatch(LikeComic(match.params.id));
  };
  const fav = [];
  for (let index = 0; index < comic?.favourites.length; index++) {
    fav.push(comic.favourites[index]);
  }
  console.log(fav);

  return (
    <Container>
      {loading && <Spinner />}
      {error && (
        <>
          <Message variant="danger">{error}</Message>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </>
      )}
      {loadingBookmark && <Spinner />}
      {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
      {loadingLike && <Spinner />}
      {errorLike && <Message variant="danger">{errorLike}</Message>}
      <>
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
                <Nav className="ml-auto">
                  {comic?.genres?.length === 0 ? (
                    <Message variant="info">No Genres</Message>
                  ) : (
                    <NavDropdown title="Genres" id="genres">
                      {comic?.genres?.map((item) => (
                        <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                          <NavDropdown.Item>{item.name}</NavDropdown.Item>
                        </LinkContainer>
                      ))}
                    </NavDropdown>
                  )}
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
              {/* 
                <ListGroup.Item>
                  {fav.map((index) => (
                    <>
                      {fav.id === index.id ? (
                        <Button
                          className="btn btn-danger btn-sm"
                          onClick={bookmarkHandler}
                        >
                          Remove
                          <FaUserCheck />
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-default btn-sm"
                          onClick={bookmarkHandler}
                        >
                          Add
                          <FaBookmark />
                        </Button>
                      )}
                    </>
                  ))}
                </ListGroup.Item> */}

              <ListGroup.Item>
                {comic?.favourites.length > 0 ||
                comic?.favourites?.id === userInfo.id ? (
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={bookmarkHandler}
                  >
                    Remove
                    <FaUserCheck />
                  </Button>
                ) : (
                  <Button
                    className="btn btn-default btn-sm"
                    onClick={bookmarkHandler}
                  >
                    Add
                    <FaBookmark />
                  </Button>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                {comic?.likes?.length > 0 ||
                comic?.likes?.id === userInfo.id ? (
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
                      Like
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
                  <Link to={`/chapter/${chapter.id}/`}>
                    <h3>{chapter.name}</h3>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </>
    </Container>
  );
}

export default ComicScreen;
