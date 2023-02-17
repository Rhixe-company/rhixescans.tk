import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { FaCrown } from "react-icons/fa";
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
          <Carousel.Item interval={5000} key={comic.id}>
            <Link to={`/comic/${comic.id}`}>
              <Image src={comic?.images} alt={comic?.images} fluid />
              <Carousel.Caption className="carousel.caption">
                <FaCrown />
                <h4>{comic?.title.substr(0, 50)}</h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ComicsCarousel;
