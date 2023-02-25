import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "../../components/features/Rating";
import Button from "@material-ui/core/Button";
import {
  listChapterDetails,
  createChapterReview,
} from "../../actions/chaptersActions";
import { CHAPTER_CREATE_REVIEW_RESET } from "../../constants/chaptersConstants";
import { ListGroup, Form, Row, Col, Image } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Chapter = ({ match, history }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const name = match.params.name;
  const classes = useStyles();
  const dispatch = useDispatch();
  const chapterDetails = useSelector((state) => state.chapterDetails);
  const { chapter, error, loading, pages } = chapterDetails;
  const chapterReviewCreate = useSelector((state) => state.chapterReviewCreate);
  const {
    success: successchapterReview,
    loading: loadingchapterReview,
    error: errorchapterReview,
  } = chapterReviewCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successchapterReview) {
      dispatch({ type: CHAPTER_CREATE_REVIEW_RESET });
      setRating(0);
      setText("");
    }
    dispatch(listChapterDetails(name));
  }, [dispatch, history, name, successchapterReview, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createChapterReview(name, {
        rating,
        text,
      })
    );
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Button
            size="large"
            variant="contained"
            color="default"
            href={`/#/comic/${chapter?.comic.slug}`}
          >
            {chapter?.comic.title}
          </Button>
          <div className={classes.paper}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              href={`/#/chapter/${name}`}
            >
              {chapter?.name}
            </Button>
            {pages?.length > 0 ? (
              <div className="pages-container">
                {pages?.map((obj) => (
                  <Image
                    className="pages-item"
                    key={obj.id}
                    src={obj.images}
                    alt={obj.images}
                    fluid
                  />
                ))}
              </div>
            ) : (
              <Message variant="info">{<small>No Page Created</small>}</Message>
            )}
            <Button
              size="large"
              variant="contained"
              color="default"
              href={`/#/comic/${chapter?.comic.slug}`}
            >
              {chapter?.comic.title}
            </Button>
          </div>
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
                    variant="contained"
                    color="secondary"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
            <Col>
              <strong>Comments</strong>
              {chapter?.reviews?.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant="flush">
                {chapter?.reviews?.map((comment) => (
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
    </Fragment>
  );
};

export default Chapter;
