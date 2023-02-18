import React from "react";
import Comics from "../components/comics/Comics";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
const BookmarksView = () => {
  const { bookmarks } = useSelector((state) => state.comicBookmarkList);

  console.log(bookmarks);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Comics comics={bookmarks} />
        </Col>
      </Row>
    </Container>
  );
};

export default BookmarksView;
