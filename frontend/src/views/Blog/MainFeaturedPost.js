import { Link } from "react-router-dom";
import { Col, Carousel, Image } from "react-bootstrap";

import { FaCrown } from "react-icons/fa";
const MainFeaturedPost = ({ posts }) => {
  return (
    <Col>
      <Carousel variant="white">
        {posts?.map((comic) => (
          <Carousel.Item interval={8000} key={comic.id}>
            <Link to={`/comic/${comic.slug}`}>
              <Image src={comic.image} alt={comic.image_url} />
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
