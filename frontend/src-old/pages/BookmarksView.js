import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bookmarkComic, bookmarkComicList } from "../actions/bookmarkActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Image, Button, Col } from "react-bootstrap";
// import Rating from "../components/Rating";
const BookmarksView = ({ history }) => {
  const dispatch = useDispatch();
  const comicBookmarkList = useSelector((state) => state.comicBookmarkList);
  const { error, loading, comics } = comicBookmarkList;
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

    dispatch(bookmarkComicList());
  }, [history, userInfo, dispatch, successBookmark]);

  function bookmarkHandler(e) {
    e.preventDefault();
    const id = e.target.value;

    dispatch(bookmarkComic(id));
  }

  return (
    <section className="cards">
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {loadingBookmark && <Loader />}
      {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
      {comics?.length > 0 ? (
        <div className="container">
          {comics?.map((comic) => (
            <div key={comic.id} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Link to={`/comic/${comic.id}/`}>
                    <Image fluid src={comic.image} />
                  </Link>
                </div>
                <div className="card-back">
                  <Link to={`/comic/${comic.id}/`}>
                    <h1>{comic.title.substr(0, 50)}</h1>
                  </Link>

                  <ul>
                    <li>
                      <Button
                        onClick={bookmarkHandler}
                        value={comic.id}
                        className="btn btn-sm btn-danger"
                      >
                        Remove From Bookmarks
                      </Button>
                    </li>
                  </ul>
                  <Col>
                    {comic.chapters?.length > 0 ? (
                      <ul className="list-group">
                        Recent Chapters:
                        {comic.chapters?.map((chapter) => (
                          <li key={chapter.id} className="list-group-item">
                            <Link to={`/chapter/${chapter.id}/`}>
                              {chapter.name.substr(0, 50)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <small>No Chapter Found</small>
                    )}
                  </Col>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <small>No Chapter Found</small>
      )}
    </section>
  );
};

export default BookmarksView;
