import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import Message from "./Message";
const Comics = ({ product }) => {
  return (
    <Card className="my-2 p-2 rounded">
      <Link to={`/comic/${product.id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/comic/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-2">
            <Rating
              value={product.rating}
              text={`${product.rating} rating`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">{product.status}</Card.Text>
        <Card.Text>
          <h4>Chapters</h4>
          {product?.chapters?.length === 0 && (
            <Message variant="info">No Chapters</Message>
          )}

          <ListGroup variant="flush">
            {product?.chapters?.map((chapter) => (
              <ListGroup.Item key={chapter.id}>
                <Link to={`/chapter/${chapter.id}/`}>{chapter.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comics;
