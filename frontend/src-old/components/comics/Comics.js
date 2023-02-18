import React from "react";
import Paginate from "../Paginate";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Col,
  Row,
  Image,
  Button,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import Rating from "../Rating";
const Comics = ({ comics, pages, page, keyword }) => {
  return (
    <Container fluid>
      {comics?.length > 0 ? (
        <Row className="comics-container">
          {comics?.map((comic) => (
            <div key={comic.id} className="comics-item">
              <Col>
                <Link to={`/comic/${comic.id}/`}>
                  <Image fluid src={comic.image} alt={comic.image} />
                </Link>

                <Button className="btn btn-sm" variant="primary">
                  {comic?.category?.map((item) => (
                    <Link key={item.id} to={`/category/${item.id}/`}>
                      {item.name}
                    </Link>
                  ))}
                </Button>
              </Col>
              <br />
              <Col className="comics-meta">
                <Link to={`/comic/${comic.id}/`}>
                  <h5 className="text-center">{comic.title}</h5>
                </Link>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Status:</strong> {comic?.status}
                  </li>
                  <li className="list-group-item">
                    <Rating
                      value={comic?.rating}
                      text={`Rating: ${comic?.rating} `}
                      color={"#f8e825"}
                    />
                  </li>
                  <li className="list-group-item">
                    <Nav className="ml-auto">
                      <NavDropdown title="Genres" id="genres">
                        {comic?.genres?.map((item) => (
                          <LinkContainer key={item.id} to={`/genre/${item.id}`}>
                            <NavDropdown.Item>{item.name}</NavDropdown.Item>
                          </LinkContainer>
                        ))}
                      </NavDropdown>
                    </Nav>
                  </li>
                </ul>
              </Col>
              <Col>
                {comic?.chapters?.length > 0 ? (
                  <Nav className="ml-auto">
                    <NavDropdown title="Recent Chapters" id="chapters">
                      {comic?.chapters?.map((post) => (
                        <LinkContainer key={post.id} to={`/chapter/${post.id}`}>
                          <NavDropdown.Item>{post.name}</NavDropdown.Item>
                        </LinkContainer>
                      ))}
                    </NavDropdown>
                  </Nav>
                ) : (
                  <small>No Chapter Found</small>
                )}
              </Col>
            </div>
          ))}
          <Paginate page={page} pages={pages} keyword={keyword} />
        </Row>
      ) : (
        <small>No Comic Added </small>
      )}
    </Container>
  );
};

export default Comics;
