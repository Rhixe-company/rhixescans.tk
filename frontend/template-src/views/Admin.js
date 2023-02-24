import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listComics } from "../actions/comicsActions";
import Paginate from "../components/Paginate";
import Posts from "../components/comics/posts";
import PostLoadingComponent from "../components/posts/postLoading";

function Admin({ match, history }) {
  const pageNumber = match.params.pageNumber || 1;

  const PostLoading = PostLoadingComponent(Posts);
  const dispatch = useDispatch();
  const { comics, error, loading, pages } = useSelector(
    (state) => state.comicsList
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    dispatch(listComics(pageNumber));
  }, [dispatch, history, userInfo, pageNumber]);

  return (
    <div className="App">
      <h1>Latest Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <PostLoading isLoading={loading} posts={comics} />
          <Paginate pages={pages} isAdmin={true} />
        </>
      )}
    </div>
  );
}
export default Admin;
