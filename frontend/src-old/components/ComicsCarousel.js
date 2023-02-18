import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopComics } from "../actions/comicsActions";

const ComicsCarousel = () => {
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
        <Carousel variant="white">
          {comics?.map((comic) => (
            <Carousel.Item interval={4000} key={comic.id}>
              <Link to={`/comic/${comic.id}`}>
                <i className="fa-solid fa-crown"></i>
                <Image src={comic?.image} alt={comic?.image} fuild="true" />

                <Carousel.Caption className="carousel.caption">
                  <h2>{comic?.title}</h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Col>
  );
};

export default ComicsCarousel;
