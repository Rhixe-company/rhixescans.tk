import axios from "axios";
import {
  COMICS_BOOKMARK_ADD_FAIL,
  COMICS_BOOKMARK_ADD_SUCCESS,
  COMICS_BOOKMARK_ADD_REQUEST,
  COMICS_BOOKMARK_LIST_FAIL,
  COMICS_BOOKMARK_LIST_SUCCESS,
  COMICS_BOOKMARK_LIST_REQUEST,
  COMICS_BOOKMARK_LIKE_REQUEST,
  COMICS_BOOKMARK_LIKE_SUCCESS,
  COMICS_BOOKMARK_LIKE_FAIL,
} from "../constants/bookmarkConstants";
import { logout } from "./userActions";
import { COMICS_DETAILS_RESET } from "../constants/comicsConstants";

export const LikeComic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMICS_BOOKMARK_LIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `/api/like/`,
      {
        postid: id,
      },
      config
    );

    dispatch({
      type: COMICS_BOOKMARK_LIKE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: COMICS_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: COMICS_BOOKMARK_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bookmarkComic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMICS_BOOKMARK_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(`/api/bookmarks/${id}/`, {}, config);
    dispatch({
      type: COMICS_BOOKMARK_ADD_SUCCESS,
      payload: data,
    });
    dispatch({
      type: COMICS_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: COMICS_BOOKMARK_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bookmarkComicList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMICS_BOOKMARK_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`/api/bookmarks/`, config);
    dispatch({
      type: COMICS_BOOKMARK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COMICS_BOOKMARK_LIST_FAIL,
      payload: message,
    });
  }
};