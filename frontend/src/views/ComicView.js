import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../actions/comicsActions";
import { bookmarkComic, LikeComic } from "../actions/bookmarkActions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { ListGroup, Image } from "react-bootstrap";
import {
  FaBookmark,
  FaHeart,
  FaUserCheck,
  FaHeartBroken,
} from "react-icons/fa";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  singleMedia: {
    display: "flex",
    width: "auto",
    height: "auto",
  },
}));

const ComicView = ({ match }) => {
  // const slug = match.params.slug;
  const classes = useStyles();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { comic, error, loading, chapters } = useSelector(
    (state) => state.comicDetails
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listComicDetails(slug));
  }, [dispatch, slug]);

  function bookmarkHandler(e) {
    e.preventDefault();
    dispatch(bookmarkComic(match.params.id));
  }

  function likeHandler(e) {
    e.preventDefault();
    dispatch(LikeComic(match.params.id));
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}> </div>{" "}
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
              <Typography
                component="h2"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {comic?.title}{" "}
              </Typography>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong> About:</strong>{" "}
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    paragraph
                  >
                    {comic?.description}{" "}
                  </Typography>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Alternativetitle:</strong> {comic?.alternativetitle}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Rating:</strong>
                  <Rating
                    value={comic?.rating}
                    text={`Rating: ${comic?.rating} `}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status:</strong> {comic?.status}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Genre:</strong>
                  <div>
                    <div className="justify-content-md-center">
                      {comic?.genres?.map((item) => (
                        <div key={item.id}>{item.name}</div>
                      ))}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Category:</strong>{" "}
                  {comic?.category?.map((item) => (
                    <Link key={item.id} to={`/category/${item.id}/`}>
                      {item.name}
                    </Link>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Artist:</strong> {comic?.artist}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>Author:</strong> {comic?.author}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Published Date:</strong>{" "}
                  {new Date(comic?.created).toLocaleString("en-US")}
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(comic?.updated).toLocaleString("en-US")}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div className="row">
            {userInfo ? (
              <div className="d-flex justify-content-between">
                {comic?.favourites?.length > 0 ? (
                  <Link
                    className="btn btn-danger btn-sm"
                    onClick={bookmarkHandler}
                  >
                    <FaUserCheck />
                  </Link>
                ) : (
                  <Link
                    className="btn btn-default btn-sm"
                    onClick={bookmarkHandler}
                  >
                    <FaBookmark />
                  </Link>
                )}
                {comic?.likes?.length > 0 ? (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link
                      onClick={likeHandler}
                      className="btn btn-danger btn-sm"
                    >
                      <FaHeartBroken />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link
                      className="btn btn-default btn-sm"
                      onClick={likeHandler}
                    >
                      <FaHeart />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                {comic?.favourites?.length > 0 ? (
                  <Link to="/login" className="btn btn-danger btn-sm">
                    <FaUserCheck />
                  </Link>
                ) : (
                  <Link className="btn btn-default btn-sm" to="/login">
                    <FaBookmark />
                  </Link>
                )}
                {comic?.likes?.length > 0 ? (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link to="/login" className="btn btn-danger btn-sm">
                      <FaHeartBroken />
                    </Link>
                  </div>
                ) : (
                  <div>
                    <strong
                      className="text-default text-center mb-3"
                      id="like_count"
                    >
                      {comic?.likes?.length}
                    </strong>
                    <Link className="btn btn-default btn-sm" to="/login">
                      <FaHeart />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="folder-meta">
            <strong>Total Chapters:{chapters?.length}</strong>
            {chapters?.length > 0 ? (
              <ListGroup variant="flush">
                {chapters?.map((chapter) => {
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
                  {
                    <>
                      <small>No Chapter</small>
                    </>
                  }
                </Message>
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default ComicView;
