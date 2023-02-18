import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listComics } from "../actions/comicsActions";
import Posts from "../components/posts/posts";
import PostLoadingComponent from "../components/posts/postLoading";

function Home() {
  const PostLoading = PostLoadingComponent(Posts);
  const dispatch = useDispatch();
  const comicsList = useSelector((state) => state.comicsList);
  const { comics, error, loading } = comicsList;

  useEffect(() => {
    dispatch(listComics());
  }, [dispatch]);
  return (
    <div className="App">
      <h1>Latest Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <PostLoading isLoading={loading} posts={comics} />
      )}
    </div>
  );
}
export default Home;
