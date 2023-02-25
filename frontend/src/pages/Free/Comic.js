import React, { Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../../actions/comicsActions";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import Rating from "../../components/features/Rating";
import { bookmarkComic } from "../../actions/bookmarkActions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBookmark, FaUserCheck } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  singleMedia: {
    width: 200,
    height: 200,
  },
}));

const Comic = ({ match }) => {
  const slug = match.params.slug;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { comic, error, loading, chapters } = useSelector(
    (state) => state.comicDetails
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const comicsBookmark = useSelector((state) => state.comicsBookmark);
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    msg,
  } = comicsBookmark;
  useEffect(() => {
    dispatch(listComicDetails(slug));
  }, [dispatch, slug]);

  const bookmarkHandler = (e) => {
    e.preventDefault();
    dispatch(bookmarkComic(slug));
  };

  return (
    <Fragment>
      <Button size="small" variant="contained" color="default" href={`/#/`}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <div className={classes.paper}>
            <img
              className={classes.singleMedia}
              src={comic?.image}
              alt={comic?.image}
            />
            <div>
              <Typography
                component="h3"
                variant="h3"
                align="center"
                color="inherit"
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
            {loadingBookmark && <Loader />}
            {errorBookmark && (
              <Message variant="danger">{errorBookmark}</Message>
            )}
            {msg && <Message variant="success">{msg}</Message>}
            {userInfo ? (
              <div className="d-flex justify-content-around">
                {comic?.favourites?.length > 0 ? (
                  <Link
                    className="btn btn-danger btn-sm"
                    onClick={bookmarkHandler}
                  >
                    <FaUserCheck />
                  </Link>
                ) : (
                  <Link
                    className="btn btn-primary btn-sm"
                    onClick={bookmarkHandler}
                  >
                    <FaBookmark />
                  </Link>
                )}
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                {comic?.favourites?.length > 0 ? (
                  <Link to="/login" className="btn btn-danger btn-sm">
                    <FaUserCheck />
                  </Link>
                ) : (
                  <Link className="btn btn-primary btn-sm" to="/login">
                    <FaBookmark />
                  </Link>
                )}
              </div>
            )}
          </div>
          <div>
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
                <Message variant="info">{<small>No Chapter</small>}</Message>
              </>
            )}
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default Comic;
