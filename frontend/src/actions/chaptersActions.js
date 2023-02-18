import axiosInstance from "../axios";
import {
  CHAPTERS_LIST_REQUEST,
  CHAPTERS_LIST_SUCCESS,
  CHAPTERS_LIST_FAIL,
  CHAPTERS_DETAILS_REQUEST,
  CHAPTERS_DETAILS_SUCCESS,
  CHAPTERS_DETAILS_FAIL,
} from "../constants/chaptersConstants";
import { logout } from "./userActions";

export const listChapters =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: CHAPTERS_LIST_REQUEST });

      const { data } = await axiosInstance.get(`/chapters/`);

      dispatch({
        type: CHAPTERS_LIST_SUCCESS,
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
        type: CHAPTERS_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listChapterDetails = (name) => async (dispatch) => {
  try {
    dispatch({ type: CHAPTERS_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/chapter/${name}/`);

    dispatch({
      type: CHAPTERS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized") {
      dispatch(logout());
    }
    dispatch({
      type: CHAPTERS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
