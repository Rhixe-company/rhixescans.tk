import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGenreDetails } from "../actions/genresActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Comics from "../components/comics/Comics";
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
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h3>List Of {genre?.name} Comics</h3>
          <Comics comics={comics} />
        </div>
      )}
    </div>
  );
};

export default GenreScreens;
