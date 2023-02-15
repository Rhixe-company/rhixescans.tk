import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  // bookmarkComic,
  // bookmarkComicList,
  // addToBookmark,
  removeFromBookmark,
} from "../actions/bookmarkActions";
// import Spinner from "../components/ui/Spinner";
// import Rating from "../components/utils/Rating";
import Message from "../components/utils/Message";

import { Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
const BookmarksScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const bookmark = useSelector((state) => state.bookmark);
  const { bookmarkItems } = bookmark;

  useEffect(() => {
    if (userInfo) {
      console.log("bookmarks....");
    } else {
      history.push("/login");
    }
  }, [history, userInfo, dispatch]);

  // const removeFromBookmarkHandler = (id) => {
  //   dispatch(removeFromBookmark(id));
  // };

  function bookmarkHandler(e) {
    e.preventDefault();
    const id = e.target.value;
    console.log(id);
    dispatch(removeFromBookmark(id));
  }

  return (
    <div>
      <Row>
        {bookmarkItems?.length > 0 ? (
          <Col sm={12} md={6} lg={4} xl={3}>
            {bookmarkItems.map((comic) => (
              <Card key={comic.id} className="my-2 p-2 rounded">
                <Link to={`/comic/${comic.id}`}>
                  <Card.Img src={comic.image} />
                </Link>

                <Card.Body>
                  <Link to={`/comic/${comic.id}`}>
                    <Card.Title as="div">
                      <strong>{comic.title}</strong>
                    </Card.Title>
                  </Link>

                  {/* <Card.Text as="div">
                    <div className="my-2">
                      <Rating
                        value={comic.rating}
                        text={`${comic.rating} rating`}
                        color={"#f8e825"}
                      />
                    </div>
                  </Card.Text> */}
                  <Card.Text as="div">
                    <Button
                      onClick={bookmarkHandler}
                      value={comic.id}
                      type="button"
                      variant="light"
                    >
                      <FaTrash />
                    </Button>
                  </Card.Text>

                  <Card.Text as="h3">{comic.status}</Card.Text>
                  <Card.Text as="div">
                    <h4>Chapters</h4>
                    {bookmarkItems?.chapters?.length === 0 && (
                      <Message variant="info">No Chapters</Message>
                    )}

                    <ListGroup variant="flush">
                      {bookmarkItems?.chapters?.map((chapter) => (
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
          <div>
            <Link to="/" className="btn btn-light my-3">
              Go Back
            </Link>
          </div>
        )}
      </Row>
    </div>
  );
};

export default BookmarksScreen;
