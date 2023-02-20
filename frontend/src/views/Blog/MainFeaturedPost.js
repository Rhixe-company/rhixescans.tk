import { Link } from "react-router-dom";
import { Col, Carousel, Image } from "react-bootstrap";

import { FaCrown } from "react-icons/fa";
const MainFeaturedPost = ({ posts }) => {
  return (
    <Col>
      <Carousel variant="dark">
        {posts?.map((comic) => (
          <Carousel.Item interval={6000} key={comic.id}>
            <Link to={`/comic/${comic.slug}`}>
              <Image src={comic?.image} alt={comic?.title} fluid />
              <Carousel.Caption className="carousel.caption">
                <FaCrown />
                <h2>{comic?.title}</h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  );
};

export default MainFeaturedPost;
