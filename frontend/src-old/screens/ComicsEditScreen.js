import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listComicDetails, updateComic } from "../actions/comicsActions";
import { COMICS_UPDATE_RESET } from "../constants/comicsConstants";

const ComicsEditScreen = ({ match, history }) => {
  const comicId = match.params.id;

  const [title, setTitle] = useState("");
  const [alternativetitle, setAlternativetitle] = useState("");
  const [slug, setSlug] = useState("");
  const [rating, setRating] = useState(0);
  const [image_url, setImage_url] = useState("");
  const [status, setStatus] = useState("");
  const [author, setAuthor] = useState("");
  const [artist, setArtist] = useState("");
  const [released, setReleased] = useState("");
  const [serialization, setSerialization] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const { error, loading, comic } = useSelector((state) => state.comic);

  const comicUpdate = useSelector((state) => state.comicUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = comicUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMICS_UPDATE_RESET });
      history.push("/admin/comics");
    } else {
      if (!comic?.title || comic?.id !== Number(comicId)) {
        dispatch(listComicDetails(comicId));
      } else {
        setTitle(comic?.title);
        setAlternativetitle(comic?.alternativetitle);
        setSlug(comic?.slug);
        setRating(comic?.rating);
        setImage_url(comic?.image_url);
        setStatus(comic?.status);
        setAuthor(comic?.author);
        setDescription(comic?.description);
        setReleased(comic?.released);
        setSerialization(comic?.serialization);
        setArtist(comic?.artist);
      }
    }
  }, [dispatch, comic, comicId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateComic(
        {
          id: comicId,
          title,
          image_url,
          description,
          rating,
          status,
          artist,
          author,
        },
        comic
      )
    );
  };

  return (
    <div>
      <h1>ComicsEditScreen</h1>
      <div>
        <Link to="/admin/comics">
          <Button className="my-3">Go Back</Button>
        </Link>
      </div>
      <div>
        <FormContainer>
          <h1>Edit Comic</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="alternativename">
                <Form.Label>Alternativetitle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Alternativetitle"
                  value={alternativetitle}
                  onChange={(e) => setAlternativetitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image"
                  value={image_url}
                  onChange={(e) => setImage_url(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="artist">
                <Form.Label>artist</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="released">
                <Form.Label>Released</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter released"
                  value={released}
                  onChange={(e) => setReleased(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="serialization">
                <Form.Label>Serialization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter serialization"
                  value={serialization}
                  onChange={(e) => setSerialization(e.target.value)}
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
};

export default ComicsEditScreen;
