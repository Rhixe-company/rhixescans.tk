import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bookmarkComic, bookmarkComicList } from "../actions/bookmarkActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import Rating from "../components/Rating";
const BookmarksView = ({ history }) => {
  const dispatch = useDispatch();
  const comicBookmarkList = useSelector((state) => state.comicBookmarkList);
  const { error, loading, comics } = comicBookmarkList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    success: successBookmark,
  } = comicsBookmark;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch(bookmarkComicList());
  }, [history, userInfo, dispatch, successBookmark]);

  function bookmarkHandler(e) {
    e.preventDefault();
    const id = e.target.value;

    dispatch(bookmarkComic(id));
  }

  return (
    <Container fluid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {loadingBookmark && <Loader />}
          {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
          {comics?.length > 0 ? (
            <div id="bookmarkResults">
              {comics?.map((comic) => (
                <div key={comic.id} className="comics-item well">
                  <Col>
                    <Image fluid src={comic.image} alt={comic.image} />
                    <div className="d-flex justify-content-between">
                      <Link target="_blank" to={`/comic/${comic.id}/`}>
                        <Button
                          className="btn btn-sm btn-default"
                          variant="secondary"
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        onClick={bookmarkHandler}
                        value={comic.id}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                  <br />
                  <Col className="comics-meta">
                    <h5 className="text-center">{comic.title}</h5>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>Status:</strong> {comic?.status}
                      </li>
                      <li className="list-group-item">
                        <Rating
                          value={comic?.rating}
                          text={`Rating: ${comic?.rating} `}
                          color={"#f8e825"}
                        />
                      </li>
                      <li className="list-group-item">
                        <strong>Category</strong>
                        {comic.category?.map((item) => (
                          <Button
                            className="btn btn-sm btn-default"
                            variant="primary"
                            key={item.id}
                          >
                            <Link to={`/category/${item.id}/`}>
                              {item.name}
                            </Link>
                          </Button>
                        ))}
                      </li>
                    </ul>
                  </Col>
                  <Col>
                    {comic.chapters?.length > 0 ? (
                      <ul className="list-group">
                        Recent Chapters:
                        {comic.chapters?.map((chapter) => (
                          <li key={chapter.id} className="list-group-item">
                            <Link to={`/chapter/${chapter.id}/`}>
                              {chapter.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <small>No Chapter Found</small>
                    )}
                  </Col>
                </div>
              ))}
            </div>
          ) : (
            <small>No Comics Found</small>
          )}
        </Row>
      )}
    </Container>
  );
};

export default BookmarksView;
