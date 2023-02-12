import {
  COMICS_BOOKMARK_LIST_REQUEST,
  COMICS_BOOKMARK_LIST_SUCCESS,
  COMICS_BOOKMARK_LIST_FAIL,
  COMICS_BOOKMARK_ADD_FAIL,
  COMICS_BOOKMARK_ADD_SUCCESS,
  COMICS_BOOKMARK_ADD_REQUEST,
  COMICS_BOOKMARK_LIKE_REQUEST,
  COMICS_BOOKMARK_LIKE_SUCCESS,
  COMICS_BOOKMARK_LIKE_FAIL,
  BOOKMARK_ADD_ITEM,
  BOOKMARK_REMOVE_ITEM,
  BOOKMARK_CLEAR_ITEMS,
} from "../constants/bookmarkConstants";

export const bookmarkReducer = (state = { bookmarkItems: [] }, action) => {
  switch (action.type) {
    case BOOKMARK_ADD_ITEM:
      const item = action.payload;
      const existItem = state.bookmarkItems.find((x) => x.comic === item.comic);
      if (existItem) {
        return {
          ...state,
          bookmarkItems: state.bookmarkItems.map((x) =>
            x.comic === existItem.comic ? item : x
          ),
        };
      } else {
        return {
          ...state,
          bookmarkItems: [...state.bookmarkItems, item],
        };
      }

    case BOOKMARK_REMOVE_ITEM:
      const deleteitem = action.payload;
      const chosenItem = state.bookmarkItems.filter(
        (x) => x.comic !== deleteitem.id
      );
      if (deleteitem) {
        return {
          ...state,
          bookmarkItems: state.bookmarkItems.map((x) =>
            x.comic === chosenItem.comic ? item : x
          ),
        };
      } else {
        return {
          ...state,
          bookmarkItems: [...state.bookmarkItems, deleteitem],
        };
      }

    case BOOKMARK_CLEAR_ITEMS:
      return {
        ...state,
        bookmarkItems: [],
      };

    default:
      return state;
  }
};

export const comicBookmarkLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case COMICS_BOOKMARK_LIKE_REQUEST:
      return { loading: true };

    case COMICS_BOOKMARK_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        result: action.payload.result,
      };

    case COMICS_BOOKMARK_LIKE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const comicBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case COMICS_BOOKMARK_ADD_REQUEST:
      return { loading: true };

    case COMICS_BOOKMARK_ADD_SUCCESS:
      return { loading: false, success: true };

    case COMICS_BOOKMARK_ADD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const comicBookmarkListReducer = (state = {}, action) => {
  switch (action.type) {
    case COMICS_BOOKMARK_LIST_REQUEST:
      return { loading: true };

    case COMICS_BOOKMARK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        comics: action.payload,
      };

    case COMICS_BOOKMARK_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
