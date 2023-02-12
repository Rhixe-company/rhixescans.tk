import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listChapterDetails,
  createChapterReview,
} from "../actions/chaptersActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import Chapter from "../components/chapters/Chapter";
import Chapters from "../components/chapters/Chapters";
import Posts from "../components/chapters/Posts";
import { CHAPTER_CREATE_REVIEW_RESET } from "../constants/chaptersConstants";
const ChapterScreens = ({ match, history }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const chapterId = match.params.id;
  const pageNumber = history.location.search;
  const dispatch = useDispatch();
  const {
    chapter,
    comic,
    error,
    loading,
    chapters,
    pages,
    page,
    chapters_count,
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
    if (userInfo) {
      if (successchapterReview) {
        dispatch({ type: CHAPTER_CREATE_REVIEW_RESET });
        setRating(0);
        setText("");
      } else {
        dispatch(listChapterDetails(chapterId, pageNumber));
      }
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    chapterId,
    pageNumber,
    successchapterReview,
    userInfo,
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
        <Row>
          <Chapter chapter={chapter} comic={comic} />
          <div>
            <Chapters
              chapters={chapters}
              chapters_count={chapters_count}
              page={page}
              pages={pages}
            />
          </div>
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
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
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
            <Posts comments={chapter?.comments} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ChapterScreens;
