import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listChapterDetails } from "../actions/chaptersActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
// import { useParams } from "react-router-dom";
//MaterialUI

import { makeStyles } from "@material-ui/core/styles";

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
    <>
      {userInfo ? (
        <React.Fragment>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className={classes.paper}>
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
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  key={page?.id}
                  src={page?.images}
                  alt={chapter?.name}
                />
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
            </div>
          )}
        </React.Fragment>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
};

export default Page;
