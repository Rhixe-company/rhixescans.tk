import { combineReducers } from "redux";

import {
  chaptersListReducer,
  chapterDetailsReducer,
  chapterDeleteReducer,
  chapterCreateReducer,
  chapterUpdateReducer,
  chaptersTopRatedReducer,
  chapterReviewCreateReducer,
} from "./chaptersReducers";
import {
  comicsListReducer,
  comicDetailsReducer,
  comicDeleteReducer,
  comicCreateReducer,
  comicUpdateReducer,
  comicsTopRatedReducer,
} from "./comicsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userProfileReducer,
} from "./userReducers";
import { genreDetailsReducer, genresListReducer } from "./genresReducers";

import {
  comicBookmarkLikeReducer,
  comicBookmarkListReducer,
  comicBookmarkReducer,
  bookmarkReducer,
} from "./bookmarkReducers";

import {
  categoryDetailsReducer,
  categorysListReducer,
} from "./categoryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfile: userProfileReducer,
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
  bookmark: bookmarkReducer,
});
export default reducer;
