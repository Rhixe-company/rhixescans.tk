import React from "react";
import CharacterGrid from "../components/characters/CharacterGrid";
import { useSelector } from "react-redux";
const BookmarksView = () => {
  const { bookmarks, loading } = useSelector(
    (state) => state.comicBookmarkList
  );

  console.log(bookmarks);
  return (
    <div className="container">
      <CharacterGrid isLoading={loading} items={bookmarks} />
    </div>
  );
};

export default BookmarksView;
