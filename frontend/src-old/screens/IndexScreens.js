import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComics, listGenres } from "../actions/comicsActions";
import ComicsCarousel from "../components/ComicsCarousel";
import { Link } from "react-router-dom";
import Comic from "../components/Comic";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Row, Col } from "react-bootstrap";

const IndexScreens = ({ history }) => {
  const dispatch = useDispatch();
  const { comics, page, pages, error, loading } = useSelector(
    (state) => state.comics
  );
  const { genres } = useSelector((state) => state.genres);
  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listComics(keyword));
    dispatch(listGenres());
  }, [dispatch, keyword]);
  return (
    <Container fluid className="bg-dark">
      <Col>
        <b>Top Comics</b>
        {!keyword ? (
          <ComicsCarousel />
        ) : (
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        )}
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <b>Recent updates </b>
          {comics?.map((comic, index) => (
            <Comic key={index} comic={comic} />
          ))}
          <Paginate page={page} pages={pages} keyword={keyword} />
        </Row>
      )}
      <b>Genres List</b>
      <nav className="nav d-flex justify-content-around">
        {genres?.map(({ id, name }) => (
          <Link className="btn btn-sm" key={id} to={`/genre/${id}`}>
            {name}
          </Link>
        ))}
      </nav>
    </Container>
  );
};

export default IndexScreens;
