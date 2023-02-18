import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listChapterDetails,
  createChapterReview,
} from "../actions/chaptersActions";
import Loader from "../components/Loader";
import { Image } from "react-bootstrap";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { ListGroup } from "react-bootstrap";
import { CHAPTER_CREATE_REVIEW_RESET } from "../constants/chaptersConstants";


const ChapterView = ({ match, history }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const chapterId = match.params.id;
  const pageNumber = history.location.search;
  let keyword = history.location.search;
  const dispatch = useDispatch();
  const {
    chapter,
    comic,
    chapters,
    error,
    loading,

  } = useSelector((state) => state.chapter);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chapterReviewCreate = useSelector((state) => state.chapterReviewCreate);
  const {
    success: successchapterReview,
    loading: loadingchapterReview,
    error: errorchapterReview,
  } = chapterReviewCreate;



  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successchapterReview) {
      dispatch({ type: CHAPTER_CREATE_REVIEW_RESET });
      setRating(0);
      setText("");
    }
    dispatch(listChapterDetails(chapterId, pageNumber, keyword));
     

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
    <Container fluid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <div className="row pages-container">
            {chapter?.pages?.map((image) => (
              <InfiniteScroll
                key={image.id}
                dataLength={chapter?.pages?.length}
                loader={loading ? <Loader /> : <></>}
              >
                <Image src={image?.images} alt={image?.images} />
              </InfiniteScroll>
            ))}
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
          <Row>
            <Col>
              {successchapterReview && (
                <Message variant="success">
                  Comment submitted successfully
                </Message>
              )}
              {loadingchapterReview && <Loader />}
              {errorchapterReview && (
                <Message variant="danger">{errorchapterReview}</Message>
              )}
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
            </Col>
            <Col>
              <strong>Comments</strong>
              {chapter?.comments?.length === 0 && (
                <Message>No Comments</Message>
              )}
              <ListGroup variant="flush">
                {chapter?.comments?.map((comment) => (
                  <ListGroup.Item key={comment.id}>
                    <strong>{comment.user.username}</strong>
                    <Rating value={comment.rating} />
                    <p>{comment.created.substring(0, 10)}</p>
                    <p>{comment.text}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ChapterView;
