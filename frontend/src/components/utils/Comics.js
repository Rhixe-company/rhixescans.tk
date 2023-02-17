import React from "react";
import { Card, ListGroup, Button, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "./Message";
import { LinkContainer } from "react-router-bootstrap";
const Comics = ({ product }) => {
  return (
    <Card className="my-2 p-2 rounded">
      <Link to={`/comic/${product.id}`}>
        <Card.Img className="card-img-top" src={product.images} />
      </Link>

      <Card.Body>
        <Link to={`/comic/${product.id}`}>
          <Card.Title as="div">
            <h3 className="text-center">{product.title.substr(0, 50)}</h3>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <span>Author: {product.author}</span>
        </Card.Text>
        <br />
        <Card.Text>
          {/* {product?.chapters?.length === 0 && (
            <Message variant="info">No Chapters</Message>
          )} */}

          <ListGroup variant="flush">
            {product?.chapters?.map((chapter) => (
              <ListGroup.Item key={chapter.id}>
                <Link to={`/chapter/${chapter.id}/`}>
                  <span>{chapter.name}</span>
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className="d-flex justify-content-between align-items-center"
        as="div"
      >
        <div>
          {" "}
          {product?.category?.map((item) => (
            <Link key={item.id} to={`/category/${item.id}`}>
              Category:
              <Button className="btn btn-sm btn-info" variant="secondary">
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <div>
          <Nav className="ml-auto">
            {product?.genres?.length === 0 ? (
              <Message variant="info">No Genres</Message>
            ) : (
              <NavDropdown
                title={
                  <>
                    <Button className="btn btn-sm btn-info" variant="secondary">
                      Genres:
                    </Button>
                  </>
                }
                id="genres"
              >
                {product?.genres?.map((item) => (
                  <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                    <NavDropdown.Item>{item.name}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
            )}

            {/* {product?.genres?.map((item) => (
                <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                  <Nav.Link>{item.name}</Nav.Link>
                </LinkContainer>
              ))} */}
          </Nav>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Comics;
