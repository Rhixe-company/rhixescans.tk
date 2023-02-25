import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { Image } from "react-bootstrap";
import { Fragment, useEffect } from "react";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import Paginate from "../../components/features/Paginate";

import { useDispatch, useSelector } from "react-redux";
import { listComics } from "../../actions/comicsActions";
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  postTitle: {
    fontSize: "16px",
    textAlign: "left",
  },
  postText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
}));

const Comics = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const comicsList = useSelector((state) => state.comicsList);
  const { comics, error, loading, pages } = comicsList;
  useEffect(() => {
    dispatch(listComics(pageNumber));
  }, [dispatch, pageNumber]);
  const classes = useStyles();
  if (comics && comics?.length === 0)
    return <p>Can not find any comics, sorry</p>;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container maxWidth="md" component="main">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="left">Category</TableCell>

                    <TableCell align="left">Image</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comics.map((post) => {
                    return (
                      <TableRow key={post.id}>
                        <TableCell component="th" scope="row">
                          <Link
                            className={classes.link}
                            to={`/comic/${post.slug}/`}
                          >
                            {" "}
                            {post.id}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          {
                            <>
                              {post?.category.map((cat) => {
                                return <h6>{cat.name}</h6>;
                              })}
                            </>
                          }
                        </TableCell>

                        <TableCell align="left">
                          <Link
                            className={classes.link}
                            to={`/comic/${post.slug}/`}
                          >
                            <Image src={post.image} alt={post.title} fluid />
                          </Link>
                        </TableCell>

                        <TableCell align="left">{post.title}</TableCell>

                        <TableCell align="left">
                          <Link to={`/admin/comic/edit/${post.id}/`}>
                            <EditIcon></EditIcon>
                          </Link>
                          <Link to={`/admin/comics/delete/${post.id}/`}>
                            <DeleteForeverIcon></DeleteForeverIcon>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      <Link to={`/admin/comic/create/`}>
                        <Button variant="contained" color="primary">
                          New Post
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paginate pages={pages} isAdmin="True" />
        </Container>
      )}
    </Fragment>
  );
};

export default Comics;
