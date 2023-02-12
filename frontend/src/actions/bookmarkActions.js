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
  BOOKMARK_ADD_ITEM,
  BOOKMARK_REMOVE_ITEM,
} from "../constants/bookmarkConstants";
import { logout } from "./userActions";

export const addToBookmark = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${userInfo.access}`,
    },
  };
  const { data } = await axios.get(`/api/comics/${id}`, config);
  dispatch({
    type: BOOKMARK_ADD_ITEM,
    payload: {
      comic: data.comic,
      id: data.comic.id,
      title: data.comic.title,
      image: data.comic.image,
      chapters: data.chapters,
    },
  });
  localStorage.setItem(
    "bookmarkItems",
    JSON.stringify(getState().bookmark.bookmarkItems)
  );
};

export const removeFromBookmark = (id) => (dispatch, getState) => {
  dispatch({
    type: BOOKMARK_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "bookmarkItems",
    JSON.stringify(getState().bookmark.bookmarkItems)
  );
};

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
