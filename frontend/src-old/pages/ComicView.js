import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../actions/comicsActions";
import { bookmarkComic, LikeComic } from "../actions/bookmarkActions";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { Button, Container, Image, NavDropdown, Nav } from "react-bootstrap";
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
  const { comic, error, loading, chapters} = useSelector(
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
      dispatch(listComicDetails(comicId, pageNumber));
    }
    if (successLike) {
      dispatch(listComicDetails(comicId, pageNumber));
    } else {
      dispatch(listComicDetails(comicId, pageNumber));
    }
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
    <Container fluid>
      {loadingBookmark && <Loader />}
      {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
      {loadingLike && <Loader />}
      {errorLike && <Message variant="danger">{errorLike}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            <div className="col-md-4">
              <Image
                fluid
                className="thumbnail"
                src={comic?.image}
                alt={comic?.image}
              />
            </div>
            <div className="col-md-8">
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
                        <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                          <NavDropdown.Item>{item.name}</NavDropdown.Item>
                        </LinkContainer>
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
                  <strong>Category:</strong>{" "}
                  <Button className="btn btn-sm" variant="secondary">
                    {comic?.category?.map((item) => (
                      <Link key={item.id} to={`/category/${item.id}/`}>
                        {item.name}
                      </Link>
                    ))}
                  </Button>
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
            </div>
          </div>
          <div className="row">
            {userInfo ? (
              <div className="d-flex justify-content-between">
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
              </div>
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
            <div className="well">
              <b>Plot:</b>
              <p> {comic?.description}</p>
            </div>
            {chapters?.length > 0 ? (
              <ul className="list-group">
                <h3>Total Chapters: {comic?.numChapters}</h3>
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
          </div>
        </>
      )}
    </Container>
  );
};

export default ComicView;
