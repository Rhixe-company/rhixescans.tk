import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listcategorysDetails } from "../actions/categoryActions";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import Comics from "../components/utils/Comics";
import { Row, Col } from "react-bootstrap";
const CategoryScreens = ({ match }) => {
  const categorId = match.params.id;
  const dispatch = useDispatch();
  const { category, error, loading, comics } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(listcategorysDetails(categorId));
  }, [dispatch, categorId]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h3>List Of {category?.name} Comics</h3>
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

export default CategoryScreens;
