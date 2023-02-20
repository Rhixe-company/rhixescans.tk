import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listChapterDetails } from "../actions/chaptersActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const Chapterpage = ({ match }) => {
  const name = match.params.name;
  const chapterDetails = useSelector((state) => state.chapterDetails);
  const dispatch = useDispatch();
  const { chapter, error, loading, pages } = chapterDetails;
  useEffect(() => {
    dispatch(listChapterDetails(name));
  }, [dispatch, name]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container">
          <ul>
            <li>
              <a href={`/#/comic/${chapter?.comic.slug}`}>
                <h1>{chapter?.comic.title}</h1>
              </a>
            </li>
            <li>
              <a href={`/#/chapter/${chapter?.name}`}>
                <h2>{chapter?.name}</h2>
              </a>
            </li>
          </ul>

          <div className="chapterContainer">
            {pages?.map((page, index) => (
              <div className="pageItem" key={index}>
                <img
                  style={{
                    width: "100%",
                  }}
                  src={page.images}
                  alt={page.images}
                />
              </div>
            ))}
          </div>
          <ul>
            <li>
              <a href={`/#/comic/${chapter?.comic.slug}`}>
                <h1>{chapter?.comic.title}</h1>
              </a>
            </li>
            <li>
              <a href={`/#/chapter/${chapter?.name}`}>
                <h2>{chapter?.name}</h2>
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Chapterpage;
