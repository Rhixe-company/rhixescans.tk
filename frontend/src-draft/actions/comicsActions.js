import axiosInstance from "../axios";

import {
  COMICS_LIST_REQUEST,
  COMICS_LIST_SUCCESS,
  COMICS_LIST_FAIL,
  COMICS_DETAILS_REQUEST,
  COMICS_DETAILS_SUCCESS,
  COMICS_DETAILS_FAIL,
  COMICS_DELETE_REQUEST,
  COMICS_DELETE_SUCCESS,
  COMICS_DELETE_FAIL,
  COMICS_CREATE_REQUEST,
  COMICS_CREATE_SUCCESS,
  COMICS_CREATE_FAIL,
  COMICS_UPDATE_REQUEST,
  COMICS_UPDATE_SUCCESS,
  COMICS_UPDATE_FAIL,
  COMICS_TOP_REQUEST,
  COMICS_TOP_SUCCESS,
  COMICS_TOP_FAIL,
} from "../constants/comicsConstants";
import { logout } from "./userActions";

export const listComics = () => async (dispatch) => {
  try {
    dispatch({ type: COMICS_LIST_REQUEST });

    const { data } = await axiosInstance.get("/comics/");
    dispatch({
      type: COMICS_LIST_SUCCESS,
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
      type: COMICS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listComicDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: COMICS_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/comic/${slug}/`);

    dispatch({
      type: COMICS_DETAILS_SUCCESS,
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
      type: COMICS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listTopComics = () => async (dispatch) => {
  try {
    dispatch({ type: COMICS_TOP_REQUEST });
    const { data } = await axiosInstance.get(`/comics/top/`);

    dispatch({
      type: COMICS_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMICS_TOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteComic = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMICS_DELETE_REQUEST,
    });

    const { data } = await axiosInstance.delete(`/comics/delete/${id}/`);
    console.log(data);
    dispatch({
      type: COMICS_DELETE_SUCCESS,
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
      type: COMICS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createComic = () => async (dispatch) => {
  try {
    dispatch({
      type: COMICS_CREATE_REQUEST,
    });

    const { data } = await axiosInstance.post(`/comics/create/`, {});
    dispatch({
      type: COMICS_CREATE_SUCCESS,
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
      type: COMICS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateComic = (comic) => async (dispatch) => {
  try {
    dispatch({
      type: COMICS_UPDATE_REQUEST,
    });

    const { data } = await axiosInstance.put(
      `/comics/update/${comic.id}/`,
      comic
    );
    dispatch({
      type: COMICS_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: COMICS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMICS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
