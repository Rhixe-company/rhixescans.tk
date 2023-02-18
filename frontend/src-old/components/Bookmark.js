import React from "react";

const Bookmark = ({ likes, bookmarks }) => {
  
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <button className="btn-sm btn text-white btn-outline-secondary my-1">
          Add to Bookmark
        </button>
      </div>
      <div>
        <button className="btn-sm btn  text-white btn-outline-secondary my-1">Like</button>
      </div>
    </div>
  );
};

export default Bookmark;
