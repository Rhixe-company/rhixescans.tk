import React, { Fragment, useEffect } from "react";
import Loader from "../../components/features/Loader";
import Message from "../../components/features/Message";
import Paginate from "../../components/features/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { listComics, listTopComics } from "../../actions/comicsActions";

const Dashboard = ({ match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const comicsList = useSelector((state) => state.comicsList);
  const { comics, error, loading, pages } = comicsList;
  const comicsTopRated = useSelector((state) => state.comicsTopRated);
  const {
    error: errorTop,
    loading: loadingTop,
    comics: comicsTop,
  } = comicsTopRated;
  useEffect(() => {
    dispatch(listComics(pageNumber));
    dispatch(listTopComics());
  }, [dispatch, pageNumber]);
  console.log(userInfo);
  return (
    <>
      {loadingTop && <Loader />}
      {errorTop && <Message variant="danger">{errorTop}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
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
          {comicsTop?.map((post) => (
            <header className="header" key={post.id}>
              <div className="container">
                <h1>{post.title}</h1>
              </div>
              <img src={post.image} alt={post.image} />
            </header>
          ))}
          <section className="boxes">
            <div className="container">
              {comics?.map((comic) => (
                <div className="box" key={comic.id}>
                  <img src={comic.image} alt={comic.image} />
                  <h2>{comic.image}</h2>
                </div>
              ))}
            </div>
          </section>
          <Paginate pages={pages} />
        </Fragment>
      )}
    </>
  );
};

export default Dashboard;
