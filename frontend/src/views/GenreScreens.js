import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGenreDetails } from "../actions/genresActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

import { Container, Image } from "react-bootstrap";
const GenreScreens = ({ match }) => {
  const genreId = match.params.id;

  const dispatch = useDispatch();
  const { genre, error, loading, comics } = useSelector(
    (state) => state.genreDetails
  );
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
          <section className="boxes">
            {comics?.length > 0 ? (
              <Container className="container">
                {comics?.map((comic) => (
                  <div key={comic.id} className="box">
                    <Link to={`/comic/${comic.id}/`}>
                      <Image fluid src={comic.image} />
                    </Link>

                    <div>
                      <Link to={`/comic/${comic.id}/`}>
                        <h2>{comic.title.substr(0, 50)}</h2>
                      </Link>

                      <p>{comic.author}</p>
                      <span>{comic.status}</span>
                    </div>
                    <div>
                      {comic.chapters?.length > 0 ? (
                        <ul className="list-group">
                          {comic.chapters?.map((chapter) => (
                            <li key={chapter.id} className="list-group-item">
                              <Link to={`/chapter/${chapter.id}/`}>
                                {chapter.name.substr(0, 30)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <small className="text-center">No Chapter Found</small>
                      )}
                    </div>
                  </div>
                ))}
              </Container>
            ) : (
              <small>No Chapter Found</small>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default GenreScreens;
