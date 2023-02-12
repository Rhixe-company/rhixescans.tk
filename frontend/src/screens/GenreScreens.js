import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGenreDetails } from "../actions/genresActions";
import { Row, Col } from "react-bootstrap";
import Message from "../components/utils/Message";
import Spinner from "../components/ui/Spinner";
import Comics from "../components/utils/Comics";
const GenreScreens = ({ match }) => {
  const genreId = match.params.id;

  const dispatch = useDispatch();
  const { genre, error, loading, comics } = useSelector((state) => state.genre);
  useEffect(() => {
    dispatch(listGenreDetails(genreId));
  }, [dispatch, genreId]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h1>List Of {genre?.name} Comics</h1>
          <Row>
            {comics?.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Comics product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default GenreScreens;
