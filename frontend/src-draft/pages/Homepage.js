import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listComics } from "../actions/comicsActions";
const Homepage = () => {
  const dispatch = useDispatch();
  const comicsList = useSelector((state) => state.comicsList);
  const { comics, error, loading } = comicsList;

  useEffect(() => {
    dispatch(listComics());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <nav className="navbar">
            <div className="container">
              <div className="logo">Rhixescans</div>
              <div>
                <ul className="nav">
                  <li>
                    <a href="/#/">Home</a>
                  </li>
                  <li>
                    <a href="/#/">Series</a>
                  </li>
                  <li>
                    <a href="/#/">Login</a>
                  </li>
                  <li>
                    <a href="/#/">Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <header className="header">
            <div className="container">
              <h1>Sample</h1>
            </div>
            <img src="./" alt="./" />
          </header>
          <section className="boxes">
            <div className="container">
              {comics?.map((comic) => (
                <div key={comic.id} className="box">
                  <a href={`/#/comic/${comic.slug}`}>
                    <img src={comic.image} alt={comic.title} />
                  </a>
                  <a href={`/#/comic/${comic.slug}/`}>
                    <h2>{comic.title}</h2>
                  </a>

                  <ul>
                    {comic.chapters?.map((chapter) => (
                      <li key={chapter.id}>
                        <a href={`/#/chapter/${chapter.name}/`}>
                          {chapter.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Homepage;
