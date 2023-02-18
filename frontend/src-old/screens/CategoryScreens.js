import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listcategorysDetails } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Comics from "../components/comics/Comics";

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
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h3>List Of {category?.name} Comics</h3>
          <Comics comics={comics} />
        </div>
      )}
    </div>
  );
};

export default CategoryScreens;
