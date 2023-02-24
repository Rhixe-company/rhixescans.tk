import * as React from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listComics, listTopComics } from "../../actions/comicsActions";

import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import MainFeaturedPost from "./MainFeaturedPost";
// import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import { listGenres } from "../../actions/genresActions";

const sidebar = {
  title: "Solo Leveling",
  description:
    "10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters”. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest”. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!",

  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};
export default function Blog({ match }) {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const comicsList = useSelector((state) => state.comicsList);
  const { comics, error, loading, pages } = comicsList;

  const comicsTopRated = useSelector((state) => state.comicsTopRated);
  const {
    error: errorTop,
    loading: loadingTop,
    comics: comicsTop,
  } = comicsTopRated;
  const genresList = useSelector((state) => state.genresList);
  const { error: errorGenres, loading: loadingGenres, genres } = genresList;

  useEffect(() => {
    dispatch(listComics(pageNumber));
    dispatch(listTopComics());
    dispatch(listGenres());
  }, [dispatch, pageNumber]);
  console.log(pages);
  return (
    <React.Fragment>
      {loadingTop && <Loader />}
      {errorTop && <Message variant="danger">{errorTop}</Message>}
      {loadingGenres && <Loader />}
      {errorGenres && <Message variant="danger">{errorGenres}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <main>
          <MainFeaturedPost posts={comicsTop} />
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main pages={pages} title="Lastest Comics " posts={comics} />

            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={genres}
              social={sidebar.social}
            />
          </Grid>
          {/* <Stack spacing={2}>
            <Pagination count={11} defaultPage={6} siblingCount={0} />
          </Stack> */}
        </main>
      )}
    </React.Fragment>
  );
}
