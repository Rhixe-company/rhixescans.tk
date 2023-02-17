import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listChapterDetails,
  createChapterReview,
} from "../actions/chaptersActions";

import Spinner from "../components/ui/Spinner";
import { Image } from "react-bootstrap";
import Message from "../components/utils/Message";
import { LinkContainer } from "react-router-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Button,
  Form,
  Row,
  Col,
  NavDropdown,
  Nav,
  Container,
} from "react-bootstrap";
import Rating from "../components/utils/Rating";
import { ListGroup } from "react-bootstrap";
import { CHAPTER_CREATE_REVIEW_RESET } from "../constants/chaptersConstants";

const ChapterScreen = ({ match, history }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const chapterId = match.params.id;
  const pageNumber = history.location.search;
  let keyword = history.location.search;
  const dispatch = useDispatch();
  const { chapter, comic, chapters, error, loading } = useSelector(
    (state) => state.chapter
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterReviewCreate = useSelector((state) => state.chapterReviewCreate);
  const {
    success: successchapterReview,
    loading: loadingchapterReview,
    error: errorchapterReview,
  } = chapterReviewCreate;

  useEffect(() => {
    if (userInfo) {
      if (successchapterReview) {
        dispatch({ type: CHAPTER_CREATE_REVIEW_RESET });
        setRating(0);
        setText("");
      }
      dispatch(listChapterDetails(chapterId, pageNumber, keyword));
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    chapterId,

    pageNumber,
    successchapterReview,
    userInfo,
    keyword,
    history,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createChapterReview(chapterId, {
        rating,
        text,
      })
    );
  };

  return (
    <React.Fragment>
      {loading && <Spinner />}
      {error && <Message variant="danger">{error}</Message>}
      <Nav className="ml-auto">
        <LinkContainer to={`/comic/${chapter?.comic}/`}>
          <Nav.Link>{comic?.title}</Nav.Link>
        </LinkContainer>
        <NavDropdown title={<>{chapter?.name}</>} id="genres">
          {chapters?.map((item) => (
            <LinkContainer key={item.id} to={`/chapter/${item.id}`}>
              <NavDropdown.Item>{item.name}</NavDropdown.Item>
            </LinkContainer>
          ))}
        </NavDropdown>
      </Nav>
      <div className="images">
        <InfiniteScroll
          dataLength={chapter?.pages?.length}
          // next={chapters}
          // hasMore={true}
          loader={<Spinner />}
        >
          {chapter?.pages?.map((image) => (
            <Image className="single-photo" key={image.id} src={image.images} />
          ))}
        </InfiniteScroll>
      </div>
      <Nav className="ml-auto">
        <LinkContainer to={`/comic/${chapter?.comic}/`}>
          <Nav.Link>{comic?.title}</Nav.Link>
        </LinkContainer>
        <NavDropdown title={<>{chapter?.name}</>} id="genres">
          {chapters?.map((item) => (
            <LinkContainer key={item.id} to={`/chapter/${item.id}`}>
              <NavDropdown.Item>{item.name}</NavDropdown.Item>
            </LinkContainer>
          ))}
        </NavDropdown>
      </Nav>
      <Container>
        {loadingchapterReview && <Spinner />}
        {successchapterReview && (
          <Message variant="success">Comment submitted successfully</Message>
        )}
        {errorchapterReview && (
          <Message variant="danger">{errorchapterReview}</Message>
        )}

        <Row>
          <Col>
            <div>
              <b>Write a Chapter Comment</b>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Trash</option>
                    <option value="2">2 - Horrible</option>
                    <option value="3">3 - Terrible</option>
                    <option value="4">4 - Bad</option>
                    <option value="5">5 - Ok</option>
                    <option value="6">6 - Watchable</option>
                    <option value="7">7 - Good</option>
                    <option value="8">8 - Very Good</option>
                    <option value="9">9 - Perfect</option>
                    <option value="10">10 - Master Piece</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="text">
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  disabled={loadingchapterReview}
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
              </Form>
            </div>
            {successchapterReview && (
              <Message variant="success">
                Comment submitted successfully
              </Message>
            )}
          </Col>
          <Col>
            <strong>Comments</strong>
            {chapter?.comments?.length === 0 && <Message>No Comments</Message>}
            <ListGroup variant="flush">
              {chapter?.comments?.map((comment) => (
                <ListGroup.Item key={comment.id}>
                  <div>
                    <img
                      className="d-inline-block align-middle"
                      width="10%"
                      height="10%"
                      src={userInfo.avatar}
                      alt={userInfo.avatar}
                    />
                    <strong>{comment.user.user_name}</strong>
                  </div>
                  <Rating value={comment.rating} />
                  <p>{comment.created.substring(0, 10)}</p>
                  <p>{comment.text}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ChapterScreen;
