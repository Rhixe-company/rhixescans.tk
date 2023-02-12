import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import Spinner from "../ui/Spinner";
import Message from "./Message";
import { listTopComics } from "../../actions/comicsActions";

const ComicsCarousel = () => {
  const dispatch = useDispatch();

  const comicsTopRated = useSelector((state) => state.comicsTopRated);
  const { error, loading, comics } = comicsTopRated;

  useEffect(() => {
    dispatch(listTopComics());
  }, [dispatch]);
  return (
    <>
      {loading && <Spinner />}
      {error && <Message variant="danger">{error}</Message>}
      <Carousel pause="hover">
        {comics?.map((comic) => (
          <Carousel.Item interval={6000} key={comic.id}>
            <Link to={`/comic/${comic.id}`}>
              <Image src={comic?.image} alt={comic?.image} fluid />

              <Carousel.Caption className="carousel.caption">
                <h4>
                  {comic?.title} <i className="fa-solid fa-crown"></i>
                </h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ComicsCarousel;
