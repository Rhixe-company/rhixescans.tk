import React from "react";
import { Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Comic = ({ comic }) => {
  return (
    <Col sm={12} md={6} lg={4} xl={3}>
      <Card className="my-1 p-1 rounded bg-dark">
        <Link className="text-white btn btn-sm" to={`/comic/${comic.id}/`}>
          <Card.Img variant="top" src={comic.image} />
        </Link>
        <br />
        <Card.Body>
          <Card.Title as="div">
            <Link className="text-white btn btn-sm" to={`/comic/${comic.id}/`}>
              <strong>{comic.title}</strong>
            </Link>
          </Card.Title>
          <br />
          <Rating
            value={comic.rating}
            text={`Rating:${comic.rating} `}
            color={"#f8e825"}
          />
          <br />
          <b>Category:</b>
          <Card.Text className="nav d-flex justify-content-around">
            {comic.category?.map((item) => (
              <Link
                className="text-white btn btn-sm"
                key={item.id}
                to={`/category/${item.id}`}
              >
                {item.name}
              </Link>
            ))}
          </Card.Text>
          <br />
          {comic.chapters?.length > 0 ? (
            <ListGroup className="list-group-flush">
              Recent Chapters:
              {comic.chapters?.map((chapter) => (
                <ListGroup.Item key={chapter.id}>
                  <Link to={`/chapter/${chapter.id}/`}>
                    <span> {chapter.name}</span>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div>No Chapter Found</div>
          )}
          <br />
          <b> Genres:</b>
          <Col className="nav d-flex justify-content-around">
            {comic.genres?.map((item) => (
              <Link
                key={item.id}
                className="text-white btn btn-sm"
                to={`/genre/${item.id}`}
              >
                {item.name}
              </Link>
            ))}
          </Col>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Comic;
