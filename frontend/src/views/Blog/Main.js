import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { ListGroup, Image } from "react-bootstrap";

function Main(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts?.map((post) => (
        <div className="markdown" key={post?.id}>
          <div>
            <Link to={`/comic/${post.slug}/`}>
              <Image src={post.image} alt={post.title} fluid />
            </Link>
          </div>
          <div>
            <Typography variant="h3" gutterBottom>
              {post?.title}
            </Typography>
            <ListGroup variant="flush">
              Genres:
              {post.genres.map((genre) => {
                return (
                  <ListGroup.Item key={genre.id}>
                    <Link to={`/genre/${genre.id}/`}>{genre.name}</Link>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
          <div>
            {post.chapters.length > 0 ? (
              <ListGroup variant="flush">
                {post.chapters.map((chapter) => {
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
        </div>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

export default Main;
