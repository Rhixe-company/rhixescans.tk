import React, { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  FaSignInAlt,
  FaRegistered,
  FaSignOutAlt,
  FaUser,
  FaTools,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import logo from "../svgs/logo.png";
import SearchBox from "./SearchBox";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { Link } from "react-router-dom";
import { listGenres } from "../actions/genresActions";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { genres } = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGenres());
  }, [dispatch]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="Rhixescans"
              width="30%"
              height="30%"
              className="d-inline-block align-middle"
            />
          </Link>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/comics" className="nav-link">
                  Comics
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Genres
                </Link>

                <div className="dropdown-menu">
                  {genres?.map((genre) => (
                    <Link
                      key={genre.id}
                      className="dropdown-item"
                      to={`/genre/${genre.id}`}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </li>

              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#/"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.username}
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile">
                      <FaTools />
                      Profile
                    </Link>

                    <div className="dropdown-divider"></div>
                    <Button
                      className="dropdown-item"
                      onClick={logoutUser}
                      variant="secondary"
                    >
                      <FaSignOutAlt /> Logout
                    </Button>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/Bookmarks">
                      <BookmarkIcon />
                      Bookmarks
                    </Link>
                  </div>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#/"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaUser />
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/login">
                      <FaSignInAlt /> Sign In
                    </Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/register">
                      <FaRegistered />
                      Register
                    </Link>
                  </div>
                </li>
              )}
              {user && userInfo.isAdmin && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#/"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Admin
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/admin/users">
                      <FaUser />
                      Users
                    </Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/admin/comics">
                      <FaBook />
                      Comics
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/admin/chapters">
                      <FaBookOpen />
                      Chapters
                    </Link>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
