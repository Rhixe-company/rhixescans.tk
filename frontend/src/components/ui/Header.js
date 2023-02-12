import React, { useEffect } from "react";
import Search from "./Search";
import { listGenres } from "../../actions/genresActions";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import logo from "../../logo.svg";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaTools,
  FaBookmark,
  FaUser,
  FaBook,
  FaBookOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { genres } = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGenres());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="App-header">
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="App-logo" src={logo} alt={logo} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              {/* {userInfo ? (
                <img
                  src={userInfo.avatar}
                  alt={userInfo.avatar}
                  height="50"
                  width="25"
                />
              ) : (
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  Rhixescans
                </h5>
              )} */}
              <img className="App-logo" src={logo} alt={logo} />
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/series">
                    Series
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Genres
                  </Link>

                  <ul className="dropdown-menu dropdown-menu-dark">
                    {genres?.map((genre) => (
                      <li key={genre.id}>
                        <Link
                          className="dropdown-item"
                          to={`/genre/${genre.id}`}
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </ul>
                </li>
                {userInfo ? (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userInfo.user_name}
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link className="dropdown-item" to="/profile/">
                          <FaTools />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Bookmarks/">
                          <FaBookmark />
                          Bookmarks
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          onClick={logoutHandler}
                          className="dropdown-item"
                          to="/"
                        >
                          <FaSignOutAlt />
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Auth
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link className="dropdown-item" to="/login/">
                          <FaSignInAlt />
                          Sign In
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          <FaUser />
                          Register
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {userInfo && userInfo.isAdmin && (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link className="dropdown-item" to="/admin/users/">
                          <FaUser />
                          Users
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/comics">
                          <FaBook />
                          Comics
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/chapters">
                          <FaBookOpen />
                          Chapters
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
              <Route render={({ history }) => <Search history={history} />} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
