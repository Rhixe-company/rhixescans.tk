import { combineReducers } from "redux";
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
import {
  comicsListReducer,
  comicDetailsReducer,
  comicDeleteReducer,
  comicCreateReducer,
  comicUpdateReducer,
  comicsTopRatedReducer,
} from "./comicsReducers";
import {
  chaptersListReducer,
  chapterDetailsReducer,
  chapterDeleteReducer,
  chapterCreateReducer,
  chapterUpdateReducer,
  chaptersTopRatedReducer,
  chapterReviewCreateReducer,
} from "./chaptersReducers";
import { genreDetailsReducer, genresListReducer } from "./genresReducers";
import {
  categoryDetailsReducer,
  categorysListReducer,
} from "./categoryReducers";
import {
  comicBookmarkLikeReducer,
  comicBookmarkListReducer,
  comicBookmarkReducer,
} from "./bookmarkReducers";

const reducer = combineReducers({
  comicsBookmark: comicBookmarkReducer,
  comicBookmarkList: comicBookmarkListReducer,
  comicBookmarkLike: comicBookmarkLikeReducer,
  genresList: genresListReducer,
  genreDetails: genreDetailsReducer,
  categorysList: categorysListReducer,
  categoryDetails: categoryDetailsReducer,
  chaptersList: chaptersListReducer,
  chapterDetails: chapterDetailsReducer,
  chapterDelete: chapterDeleteReducer,
  chapterCreate: chapterCreateReducer,
  chapterUpdate: chapterUpdateReducer,
  chaptersTopRatedReducer: chaptersTopRatedReducer,
  chapterReviewCreate: chapterReviewCreateReducer,
  comicsList: comicsListReducer,
  comicDetails: comicDetailsReducer,
  comicDelete: comicDeleteReducer,
  comicCreate: comicCreateReducer,
  comicUpdate: comicUpdateReducer,
  comicsTopRated: comicsTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});
export default reducer;
