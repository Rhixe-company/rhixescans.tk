import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { listChapterDetails } from "../../actions/chaptersActions";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Chapter = ({ match }) => {
  const name = match.params.name;
  const classes = useStyles();
  const dispatch = useDispatch();
  const chapterDetails = useSelector((state) => state.chapterDetails);
  const { chapter, error, loading, pages } = chapterDetails;
  useEffect(() => {
    dispatch(listChapterDetails(name));
  }, [dispatch, name]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Button
            size="large"
            variant="contained"
            color="default"
            href={`/#/comic/${chapter?.comic.slug}`}
          >
            {chapter?.comic.title}
          </Button>
          <div className={classes.paper}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              href={`/#/chapter/${name}`}
            >
              {chapter?.name}
            </Button>
            {pages?.length > 0 ? (
              <div className="pages-container">
                {pages?.map((obj) => (
                  <img
                    className="pages-item"
                    key={obj.id}
                    src={obj.images}
                    alt={obj.images}
                  />
                ))}
              </div>
            ) : (
              <Message variant="info">{<small>No Page Created</small>}</Message>
            )}
            <Button
              size="large"
              variant="contained"
              color="default"
              href={`/#/comic/${chapter?.comic.slug}`}
            >
              {chapter?.comic.title}
            </Button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Chapter;
