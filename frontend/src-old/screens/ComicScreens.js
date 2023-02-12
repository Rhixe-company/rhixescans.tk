import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../actions/comicsActions";
import { bookmarkComic, LikeComic } from "../actions/bookmarkActions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import ChapterPaginate from "../components/ChapterPaginate";
import { Container, Button, Image } from "react-bootstrap";
import {
  FaBookmark,
  FaHeart,
  FaUserCheck,
  FaHeartBroken,
} from "react-icons/fa";

const ComicView = ({ match, history }) => {
  const comicId = match.params.id;
  const pageNumber = history.location.search;
  const dispatch = useDispatch();
  const { comic, error, loading, chapters, pages, page } = useSelector(
    (state) => state.comic
  );
  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    success: successBookmark,
    results,
  } = comicsBookmark;

  const comicBookmarkLike = useSelector((state) => state.comicBookmarkLike);
  const {
    error: errorLike,
    loading: loadingLike,
    success: successLike,
  } = comicBookmarkLike;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successBookmark) {
      history.push(`/comic/${comicId}`);
    }
    if (successLike) {
      history.push(`/comic/${comicId}`);
    }
    dispatch(listComicDetails(comicId, pageNumber));
  }, [
    history,
    userInfo,
    dispatch,
    comicId,
    successBookmark,
    pageNumber,
    successLike,
  ]);
  const fav = [];
  for (let i = 0; i < comic?.favourites?.length; i++) {
    fav.push(comic.favourites[i]);
  }
  const lik = [];
  for (let i = 0; i < comic?.likes?.length; i++) {
    lik.push(comic.favourites[i]);
  }

  function bookmarkHandler(e) {
    e.preventDefault();
    dispatch(bookmarkComic(Number(comicId)));
  }

  function likeHandler(e) {
    e.preventDefault();

    dispatch(LikeComic(comicId));

    const options = {
      method: "POST",
      url: "/api/like/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0ODg2NzgyLCJpYXQiOjE2NzQ4MDAzODIsImp0aSI6ImY2NGU5NGM0YzhjMjQyZWRiMDI4YTZlM2M3YTM3YTFlIiwidXNlcl9pZCI6MX0.kWyIPqlHE5kmpzXCRfFpqv6GdsZNy-ePuhUbd5dNQPA",
      },
      data: { postid: comicId },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <Container fluid>
      {loadingBookmark && <Loader />}
      {errorBookmark && <Message variant="danger">{errorBookmark}</Message>}
      {loadingLike && <Loader />}
      {errorLike && <Message variant="danger">{errorLike}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            <div className="col-md-4">
              <Image
                fluid
                className="thumbnail"
                src={comic?.image}
                alt={comic?.image}
              />
            </div>
            <div className="col-md-8">
              <h3>{comic?.title}</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Alternativetitle:</strong> {comic?.alternativetitle}
                </li>
                <li className="list-group-item">
                  <Rating
                    value={comic?.rating}
                    text={`Rating: ${comic?.rating} `}
                    color={"#f8e825"}
                  />
                </li>
                <li className="list-group-item">
                  <strong>Genres:</strong>{" "}
                  {comic?.genres?.map((item) => (
                    <Link
                      className="btn btn-default btn-sm"
                      key={item.id}
                      to={`/genre/${item.id}`}
                    >
                      {" "}
                      {item.name}
                    </Link>
                  ))}
                </li>
                <li className="list-group-item">
                  <strong>Artist:</strong> {comic?.artist}
                </li>
                <li className="list-group-item">
                  <strong>Published Date:</strong>{" "}
                  {new Date(comic?.created).toLocaleString("en-US")}
                </li>
                <li className="list-group-item">
                  <strong>Author:</strong> {comic?.author}
                </li>
                <li className="list-group-item">
                  <strong>Category:</strong>{" "}
                  {comic?.category?.map((item) => (
                    <Link
                      className="btn btn-default btn-sm"
                      key={item.id}
                      to={`/category/${item.id}`}
                    >
                      {" "}
                      {item.name}
                    </Link>
                  ))}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong> {comic?.status}
                </li>
                <li className="list-group-item">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(comic?.updated).toLocaleString("en-US")}
                </li>

                <li className="list-group-item">
                  <strong>Released:</strong> {comic?.released}
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            {userInfo ? (
              <div className="d-flex justify-content-between">
                {fav === null ? (
                  <Button onClick={bookmarkHandler} className="btn btn-danger">
                    <FaUserCheck />
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={bookmarkHandler}>
                    <FaBookmark />
                  </Button>
                )}
                {!lik === null ? (
                  <div>
                    <strong
                      className="text-default text-center"
                      id="like_count"
                    >
                      {results}
                    </strong>
                    <br />
                    <Button
                      variant="secondary"
                      id="like-button"
                      value={comic?.id}
                      onClick={likeHandler}
                    >
                      <FaHeart />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <strong
                      className="text-default text-center"
                      id="like_count"
                    >
                      {results}
                    </strong>
                    <Button
                      className="btn btn-danger"
                      id="like-button"
                      value={comic?.id}
                      onClick={likeHandler}
                    >
                      <FaHeartBroken />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">Login</Link>
              </>
            )}
            <div className="well">
              <b>Plot:</b>
              <p> {comic?.description}</p>
            </div>
            {chapters?.length > 0 ? (
              <ul className="list-group">
                <strong>Recent Chapters:</strong>
                {chapters?.map((chapter) => (
                  <li key={chapter.id} className="list-group-item">
                    <Link
                      className="btn btn-default"
                      to={`/chapter/${chapter.id}/`}
                    >
                      {chapter.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <small className="text-white text-center">No Chapter Found</small>
            )}
            <ChapterPaginate pages={pages} page={page} isAdmin={false} />
          </div>
        </>
      )}
    </Container>
  );
};

export default ComicView;
