import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listChapterDetails } from "../actions/chaptersActions";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import { useParams } from "react-router-dom";
//MaterialUI
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  singleMedia: {
    margin: "0",
    padding: "0",
    width: "100%",
    height: "100%",
  },
}));

const Page = ({ match, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const name = match.params.name;
  const chapterDetails = useSelector((state) => state.chapterDetails);
  const { chapter, error, loading, pages } = chapterDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listChapterDetails(name));
  }, [dispatch, history, name]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}> </div>{" "}
      {userInfo ? (
        <>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <div>
                  <Link to={`/comic/${chapter?.comic.slug}/`}>
                    <Typography
                      component="h2"
                      variant="h3"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      {chapter?.comic.title}
                    </Typography>
                  </Link>
                  <Link to={`/chapter/${chapter?.name}/`}>
                    <Typography
                      component="h3"
                      variant="h4"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      {chapter?.name}
                    </Typography>
                  </Link>
                </div>

                {pages?.map((page) => (
                  <InfiniteScroll
                    key={page.id}
                    dataLength={pages?.length}
                    loader={loading ? <Loader /> : <></>}
                  >
                    <Image
                      fluid
                      className={classes.singleMedia}
                      src={page.images}
                      alt={chapter.name}
                    />
                  </InfiniteScroll>
                ))}
                <div>
                  <Link to={`/comic/${chapter?.comic.slug}/`}>
                    <Typography
                      component="h2"
                      variant="h3"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      {chapter?.comic.title}
                    </Typography>
                  </Link>
                  <Link to={`/chapter/${chapter?.name}/`}>
                    <Typography
                      component="h3"
                      variant="h4"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      {chapter?.name}
                    </Typography>
                  </Link>
                </div>
              </Container>
            </div>
          )}
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </Container>
  );
};

export default Page;
