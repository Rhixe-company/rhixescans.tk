import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  chaptersListReducer,
  chapterDetailsReducer,
  chapterDeleteReducer,
  chapterCreateReducer,
  chapterUpdateReducer,
  chaptersTopRatedReducer,
  chapterReviewCreateReducer,
} from "./reducers/chaptersReducers";
import {
  comicsListReducer,
  comicDetailsReducer,
  comicDeleteReducer,
  comicCreateReducer,
  comicUpdateReducer,
  comicsTopRatedReducer,
} from "./reducers/comicsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  genreDetailsReducer,
  genresListReducer,
} from "./reducers/genresReducers";

import {
  comicBookmarkLikeReducer,
  comicBookmarkListReducer,
  comicBookmarkReducer,
} from "./reducers/bookmarkReducers";

import {
  categoryDetailsReducer,
  categorysListReducer,
} from "./reducers/categoryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  comics: comicsListReducer,
  comic: comicDetailsReducer,
  genres: genresListReducer,
  genre: genreDetailsReducer,
  categorys: categorysListReducer,
  category: categoryDetailsReducer,
  comicDelete: comicDeleteReducer,
  comicCreate: comicCreateReducer,
  comicUpdate: comicUpdateReducer,
  comicsTopRated: comicsTopRatedReducer,
  comicsBookmark: comicBookmarkReducer,
  comicBookmarkList: comicBookmarkListReducer,
  comicBookmarkLike: comicBookmarkLikeReducer,
  chapters: chaptersListReducer,
  chapter: chapterDetailsReducer,
  chapterDelete: chapterDeleteReducer,
  chapterCreate: chapterCreateReducer,
  chapterUpdate: chapterUpdateReducer,
  chaptersTopRatedReducer: chaptersTopRatedReducer,
  chapterReviewCreate: chapterReviewCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
