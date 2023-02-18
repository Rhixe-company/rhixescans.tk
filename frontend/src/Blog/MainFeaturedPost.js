import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Carousel, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listTopComics } from "../actions/comicsActions";

const MainFeaturedPost = () => {
  const dispatch = useDispatch();

  const comicsTopRated = useSelector((state) => state.comicsTopRated);
  const { error, loading, comics } = comicsTopRated;

  useEffect(() => {
    dispatch(listTopComics());
  }, [dispatch]);
  return (
    <Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel variant="dark">
          {comics?.map((comic) => (
            <Carousel.Item interval={6000} key={comic.id}>
              <Link to={`/comic/${comic.slug}`}>
                <Image src={comic?.images} alt={comic?.images} fluid />
                <Carousel.Caption className="carousel.caption">
                  <h2>{comic?.title}</h2>
                  <i className="fa-solid fa-crown"></i>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Col>
  );
};

export default MainFeaturedPost;
