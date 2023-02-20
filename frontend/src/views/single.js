import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComicDetails } from "../actions/comicsActions";
// import { useParams } from "react-router-dom";
//MaterialUI
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ListGroup, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
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

export default function Post({ match }) {
  const slug = match.params.slug;
  // const { slug } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { comic, error, loading, chapters } = useSelector(
    (state) => state.comicDetails
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listComicDetails(slug));
  }, [dispatch, slug]);

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
            <div className="folder">
              <div className="folder-info">
                <div className="folder-media">
                  <Image
                    fluid
                    className={classes.singleMedia}
                    src={comic?.image}
                    alt={comic?.title}
                  />
                </div>
                <div className="folder-header">
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
                      <strong>Alternativetitle:</strong>{" "}
                      {comic?.alternativetitle}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Rating:</strong>
                      <em>{comic?.rating}</em>
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
              <br />
              <div className="folder-meta">
                <strong>Chapters List</strong>
                <ListGroup variant="flush">
                  {chapters?.map((chapter) => (
                    <ListGroup.Item key={chapter.id}>
                      <strong>Name:</strong>
                      <Link to={`/chapter/${chapter.name}/`}>
                        {chapter.name}
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
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
}
