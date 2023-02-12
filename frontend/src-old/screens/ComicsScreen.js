import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComics } from "../actions/comicsActions";
import ComicsCarousel from "../components/ComicsCarousel";
import CharacterGrid from "../components/characters/CharacterGrid";
import Paginate from "../components/Paginate";
import Spinner from "../components/ui/Spinner";
import Message from "../components/Message";

const ComicsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { comics, page, pages, error, loading } = useSelector(
    (state) => state.comics
  );
  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listComics(keyword));
  }, [dispatch, keyword]);
  return (
    <React.Fragment>
      <div>{!keyword && <ComicsCarousel />}</div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container">
          <CharacterGrid isLoading={loading} items={comics} />
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </React.Fragment>
  );
};

export default ComicsScreen;
