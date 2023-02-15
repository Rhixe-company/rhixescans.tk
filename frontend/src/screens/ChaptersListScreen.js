import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/ui/Spinner";
import Message from "../components/utils/Message";
import ChapterPaginate from "../components/utils/ChapterPaginate";
import ChapterForm from "../components/utils/ChapterForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  listChapters,
  deleteChapter,
  createChapter,
} from "../actions/chaptersActions";
import { CHAPTERS_CREATE_RESET } from "../constants/chaptersConstants";

const ChaptersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, chapters, chapters_count, pages, page } = useSelector(
    (state) => state.chapters
  );

  const chapterDelete = useSelector((state) => state.chapterDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = chapterDelete;

  const chapterCreate = useSelector((state) => state.chapterCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    chapter: createdChapter,
  } = chapterCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: CHAPTERS_CREATE_RESET });
      if (successCreate) {
        history.push(`/admin/chapter/${createdChapter.id}/edit`);
      } else {
        dispatch(listChapters(keyword));
      }
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdChapter,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(id));
    }
  };

  const createChapterHandler = () => {
    dispatch(createChapter());
  };

  return (
    <Container fluid>
      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <ChapterForm createChapterHandler={createChapterHandler} />
          <strong>{chapters_count} chapters available</strong>
          <div>
            <Table
              className="table table-striped text-white"
              striped
              bordered
              hover
              size="sm"
              responsive="sm"
            >
              <thead className="text-white">
                <tr className="text-white">
                  <th>ComicId</th>
                  <th>Name</th>
                  <th>Pages</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="text-white">
                {chapters?.map((chapter) => (
                  <tr className="text-white" key={chapter.id}>
                    <td>
                      <Link
                        className="text-white btn btn-sm"
                        to={`/comic/${chapter.comic}/`}
                      >
                        <span className="text-white">{chapter.comic}</span>
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-white btn btn-sm"
                        to={`/chapter/${chapter.id}/`}
                      >
                        <span className="text-white">{chapter.name}</span>
                      </Link>
                    </td>
                    <td>
                      <span className="text-white">{chapter.numPages}</span>
                    </td>

                    <td>
                      <LinkContainer
                        className="text-white "
                        to={`/admin/chapter/${chapter.id}/edit`}
                      >
                        <Button variant="dark" className="btn-sm">
                          <FaEdit className="fas fa-edit" />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(chapter.id)}
                      >
                        <FaTrash className="fas fa-trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ChapterPaginate pages={pages} page={page} isAdmin={true} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default ChaptersListScreen;
