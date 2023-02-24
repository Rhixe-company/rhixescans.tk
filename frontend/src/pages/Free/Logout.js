import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/userActions";

const Logout = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(logout());

      history.push("/");
      window.location.reload();
    }
  });
  return <div></div>;
};

export default Logout;
