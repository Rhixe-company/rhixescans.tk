import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bookmarkComic, bookmarkComicList } from "../actions/bookmarkActions";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import Rating from "../components/utils/Rating";
import { Card, ListGroup, Button, Col, Row } from "react-bootstrap";

const BookmarksScreen = ({ history }) => {
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
    <div>
      <Row>
        {loading && <Spinner />}
        {error && <Message variant="danger">{error}</Message>}
        {loadingBookmark && <Spinner />}
        {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
        {comics?.length > 0 ? (
          <Col sm={12} md={6} lg={4} xl={3}>
            {comics.map((product) => (
              <Card key={product.id} className="my-2 p-2 rounded">
                <Link to={`/comic/${product.id}`}>
                  <Card.Img src={product.image} />
                </Link>

                <Card.Body>
                  <Link to={`/comic/${product.id}`}>
                    <Card.Title as="div">
                      <strong>{product.title}</strong>
                    </Card.Title>
                  </Link>

                  <Card.Text as="div">
                    <div className="my-2">
                      <Rating
                        value={product.rating}
                        text={`${product.rating} rating`}
                        color={"#f8e825"}
                      />
                    </div>
                    <Button
                      onClick={bookmarkHandler}
                      value={product.id}
                      className="btn btn-sm btn-danger"
                    >
                      Remove From Bookmarks
                    </Button>
                  </Card.Text>

                  <Card.Text as="h3">{product.status}</Card.Text>
                  <Card.Text>
                    <h4>Chapters</h4>
                    {product?.chapters?.length === 0 && (
                      <Message variant="info">No Chapters</Message>
                    )}

                    <ListGroup variant="flush">
                      {product?.chapters?.map((chapter) => (
                        <ListGroup.Item key={chapter.id}>
                          <Link to={`/chapter/${chapter.id}/`}>
                            {chapter.name}
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        ) : (
          <div></div>
        )}
      </Row>
    </div>
  );
};

export default BookmarksScreen;
