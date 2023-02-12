import React from "react";
import { Card, ListGroup, Button, Nav } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import Message from "./Message";
import { LinkContainer } from "react-router-bootstrap";
const Comics = ({ product }) => {
  return (
    <Card className="my-1 p-0 rounded">
      <Link to={`/comic/${product.id}`}>
        <Card.Img className="card-img-top" src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/comic/${product.id}`}>
          <Card.Title as="div">
            <h3>{product.title}</h3>
          </Card.Title>
        </Link>
        <br />
        <Card.Text as="div">
          {product?.category?.map((item) => (
            <Link key={item.id} to={`/category/${item.id}`}>
              <Button className="btn btn-sm btn-info" variant="secondary">
                {item.name}
              </Button>
            </Link>
          ))}
        </Card.Text>
        <Card.Text as="div">
          <div className="my-2">
            <Rating
              value={product.rating}
              text={`${product.rating} rating`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text
          className="d-flex justify-content-around align-items-center"
          as="div"
        >
          <Nav className="ml-auto">
            {product?.genres?.map((item) => (
              <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                <Nav.Link>{item.name}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <h3>Chapters:</h3>
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
      </Card.Footer>
    </Card>
  );
};

export default Comics;
