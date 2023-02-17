import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Comics from "../components/utils/Comics";
import { listComics } from "../actions/comicsActions";

import Spinner from "../components/ui/Spinner";
import ComicsCarousel from "../components/utils/ComicsCarousel";
import Message from "../components/utils/Message";
import Paginate from "../components/utils/Paginate";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const { comics, page, pages, error, loading } = useSelector(
    (state) => state.comics
  );

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listComics(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ComicsCarousel />}

      <br />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {comics?.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Comics product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
