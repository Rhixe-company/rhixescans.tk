import React, { Fragment, useEffect } from "react";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import { useDispatch, useSelector } from "react-redux";
import { listComics, listTopComics } from "../../actions/comicsActions";
import GridContainer from "../../components/features/GridContainer";

const Home = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const comicsList = useSelector((state) => state.comicsList);
  const { comics, error, loading, pages } = comicsList;
  const comicsTopRated = useSelector((state) => state.comicsTopRated);
  const {
    error: errorTop,
    loading: loadingTop,
    comics: comicsTop,
  } = comicsTopRated;
  useEffect(() => {
    dispatch(listComics(pageNumber));
    dispatch(listTopComics());
  }, [dispatch, pageNumber]);
  return (
    <Fragment>
      {loadingTop && <Loader />}
      {errorTop && <Message variant="danger">{errorTop}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <GridContainer comics={comics} comicsTop={comicsTop} pages={pages} />
      )}
    </Fragment>
  );
};

export default Home;
