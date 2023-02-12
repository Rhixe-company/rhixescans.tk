import React from "react";

import { Link } from "react-router-dom";

import { Container, Col, Row, Image, Button } from "react-bootstrap";
const Comic = ({ comics }) => {
  return (
    <div className="container">
      <Row className="comics-container">
        {comics?.map((comic, index) => (
          <Container key={index} className="comics-item">
            <Col>
              <Link to={`/comic/${comic.id}/`}>
                <Image fluid src={comic.image} alt={comic.image} />
              </Link>
              <Col>
                <Button className="btn btn-sm btn-default" variant="secondary">
                  {" "}
                  {comic?.category?.name}
                </Button>
              </Col>
            </Col>
            <br />
            <Col>
              <Col>
                <Link to={`/comic/${comic.id}/`}>
                  <h5 className="text-center">{comic.title}</h5>
                </Link>
              </Col>
              <Col>
                <p className="text-center">{comic.status}</p>
              </Col>
            </Col>
            <Col>
              {comic.chapters?.length > 0 ? (
                <ul className="list-group">
                  Recent Chapters:
                  {comic.chapters?.map((chapter) => (
                    <li key={chapter.id} className="list-group-item">
                      <Link to={`/chapter/${chapter.id}/`}>{chapter.name}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <small>No Chapter Found</small>
              )}
            </Col>
          </Container>
        ))}
      </Row>
    </div>
  );
};

export default Comic;
