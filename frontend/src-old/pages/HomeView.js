import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComics } from "../actions/comicsActions";
import ComicsCarousel from "../components/ComicsCarousel";
import Comics from "../components/comics/Comics";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Col, Row } from "react-bootstrap";
const HomeView = ({ history }) => {
  const dispatch = useDispatch();
  const { comics, page, pages, error, loading } = useSelector(
    (state) => state.comics
  );
  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listComics(keyword));
  }, [dispatch, keyword]);
  return (
    <Container fluid>
      <Row>
        <Col>{!keyword && <ComicsCarousel />}</Col>
      </Row>

      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Col>
            <Comics
              comics={comics}
              pages={pages}
              page={page}
              keyword={keyword}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomeView;
