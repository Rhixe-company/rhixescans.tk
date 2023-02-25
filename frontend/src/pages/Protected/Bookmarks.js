import React, { Fragment, useEffect } from "react";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import Paginate from "../../components/features/Paginate";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkComic,
  bookmarkComicList,
} from "../../actions/bookmarkActions";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const Bookmarks = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const comicBookmarkList = useSelector((state) => state.comicBookmarkList);
  const { error, loading, comics, pages } = comicBookmarkList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    success: successBookmark,
  } = comicsBookmark;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (successBookmark) {
      dispatch(bookmarkComicList(pageNumber));
    }

    dispatch(bookmarkComicList(pageNumber));
  }, [dispatch, history, pageNumber, userInfo, successBookmark]);

  const bookmarkHandler = (e) => {
    e.preventDefault();
    dispatch(bookmarkComic(e.target.value));
    // window.location.reload();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <section className="boxes">
            <div className="container">
              {loadingBookmark && <Loader />}
              {errorBookmark && (
                <Message variant="danger">{errorBookmark}</Message>
              )}
              {comics?.length > 0 ? (
                <>
                  {comics?.map((comic) => (
                    <div className="box" key={comic.id}>
                      <Link to={`/comic/${comic.slug}`}>
                        <img src={comic.image} alt={comic.image} />
                      </Link>
                      <Link to={`/comic/${comic.slug}`}>
                        <h2>{comic.title}</h2>
                      </Link>
                      {loadingBookmark && <Loader />}
                      {errorBookmark && (
                        <Message variant="danger">{errorBookmark}</Message>
                      )}

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
                      <Button
                        onClick={bookmarkHandler}
                        value={comic.slug}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </>
              ) : (
                <small>No Comics Found</small>
              )}
            </div>
            <Paginate pages={pages} />
          </section>
        </Fragment>
      )}
    </>
  );
};

export default Bookmarks;
