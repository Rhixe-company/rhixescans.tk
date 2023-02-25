import React from "react";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { Carousel, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const GridContainer = ({ comics, comicsTop }) => {
  return (
    <React.Fragment>
      <Typography variant="h2" component="div">
        Top Comics
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        <Grid xs item>
          <Carousel className="container" variant="white">
            {comicsTop?.map((post) => (
              <Carousel.Item key={post.id} interval={8000}>
                <Link to={`/comic/${post.slug}`}>
                  <img src={post.image} alt={post.image} />
                  <Carousel.Caption className="carousel.caption">
                    <h2>{post.title}</h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>
      </Grid>

      <Typography variant="h2" component="div">
        Recent Updates
      </Typography>
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          {comics?.map((comic) => (
            <div className="box" key={comic.id}>
              <Link to={`/comic/${comic.slug}`}>
                <img src={comic.image} alt={comic.image} />
              </Link>
              <Link to={`/comic/${comic.slug}`}>
                <h2>{comic.title}</h2>
              </Link>
              <div>
                {comic.chapters.length > 0 ? (
                  <ListGroup variant="flush">
                    {comic.chapters.map((chapter) => {
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
                  <small>No Chapter</small>
                )}
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default GridContainer;
