import React, { Fragment, useEffect } from "react";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import Paginate from "../../components/features/Paginate";

import { useDispatch, useSelector } from "react-redux";
import { listComics, listTopComics } from "../../actions/comicsActions";
import { Link } from "react-router-dom";
import { Carousel, ListGroup } from "react-bootstrap";

const Dashboard = ({ match }) => {
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
    <>
      {loadingTop && <Loader />}
      {errorTop && <Message variant="danger">{errorTop}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <header className="header">
            <Carousel className="container" variant="white">
              {comicsTop?.map((post) => (
                <Carousel.Item key={post.id} interval={8000}>
                  <Link to={`/comic/${post.slug}`}>
                    <img src={post.image} alt={post.image} />
                    <Carousel.Caption className="carousel.caption">
                      <h2>{post.title}</h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          </header>

          <section className="boxes">
            <div className="container">
              {comics?.map((comic) => (
                <div className="box" key={comic.id}>
                  <Link to={`/comic/${comic.slug}`}>
                    <img src={comic.image} alt={comic.image} />
                  </Link>
                  <Link to={`/comic/${comic.slug}`}>
                    <h2>{comic.title}</h2>
                  </Link>
                  <div>
                    {comic.chapters.length > 0 ? (
                      <ListGroup variant="flush">
                        {comic.chapters.map((chapter) => {
                          return (
                            <ListGroup.Item key={chapter.id}>
                              <strong>Name:</strong>
                              <Link to={`/chapter/${chapter.name}/`}>
                                {chapter.name}
                              </Link>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    ) : (
                      <>
                        <Message variant="info">
                          {<small>No Chapter</small>}
                        </Message>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Paginate pages={pages} />
          </section>
        </Fragment>
      )}
    </>
  );
};

export default Dashboard;
