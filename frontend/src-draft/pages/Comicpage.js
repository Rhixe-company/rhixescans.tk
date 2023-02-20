import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../actions/comicsActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const Comicpage = ({ match }) => {
  const slug = match.params.slug;
  const dispatch = useDispatch();
  const { comic, error, loading, chapters } = useSelector(
    (state) => state.comicDetails
  );

  useEffect(() => {
    dispatch(listComicDetails(slug));
  }, [dispatch, slug]);

  return (
    <div className="container">
      <a href="/#/">Go Back</a>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="comicItem">
          <div>
            <img src={comic?.image} alt={comic?.title} />
          </div>
          <div>
            <h1>{comic?.title}</h1>
          </div>
          <div>
            <ul>
              {chapters?.map((chapter) => (
                <li key={chapter.id}>
                  <a href={`/#/chapter/${chapter.name}/`}>{chapter.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comicpage;
