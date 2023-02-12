import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import FormContainer from "../components/utils/FormContainer";
import { listChapterDetails, updateChapter } from "../actions/chaptersActions";
import { CHAPTERS_UPDATE_RESET } from "../constants/chaptersConstants";

function ChaptersEditScreen({ match, history }) {
  const chapterId = match.params.id;
  const [name, setName] = useState("");
  const [pages, setPages] = useState("");
  const dispatch = useDispatch();

  const { error, loading, chapter } = useSelector((state) => state.chapter);

  const chapterUpdate = useSelector((state) => state.chapterUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = chapterUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CHAPTERS_UPDATE_RESET });
      history.push("/admin/chapters");
    } else {
      if (!chapter?.name || chapter?.id !== Number(chapterId)) {
        dispatch(listChapterDetails(chapterId));
      } else {
        setName(chapter?.name);
        setPages(chapter?.pages);
      }
    }
  }, [dispatch, chapter, chapterId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateChapter({
        id: chapterId,
        name,
        pages,
      })
    );
  };
  return (
    <div>
      <h1>ChapterEditScreen</h1>
      <div>
        <Link to="/admin/chapters">
          <Button className="my-3">Go Back</Button>
        </Link>
      </div>
      <div>
        <FormContainer>
          <h1>Edit Chapter</h1>
          {loadingUpdate && <Spinner />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loading ? (
            <Spinner />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="pages">
                <Form.Label>Pages</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    </div>
  );
}

export default ChaptersEditScreen;
