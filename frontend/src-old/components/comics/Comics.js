import Paginate from "../Paginate";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import {
  // Container,
  // Col,
  // Row,
  // Image,
  // Button,
  // NavDropdown,
  // Nav,
  Container,
  Image,
} from "react-bootstrap";
// import Rating from "../Rating";
const Comics = ({ comics, pages, page, keyword }) => {
  return (
    <section className="boxes">
      {comics?.length > 0 ? (
        <Container className="container">
          {comics?.map((comic) => (
            <div key={comic.id} className="box">
              <Link to={`/comic/${comic.id}/`}>
                <Image fluid src={comic.image} />
              </Link>

              <div>
                <Link to={`/comic/${comic.id}/`}>
                  <h2>{comic.title.substr(0, 50)}</h2>
                </Link>

                <p>{comic.author}</p>
                <span>{comic.status}</span>
              </div>
              <div>
                {comic.chapters?.length > 0 ? (
                  <ul className="list-group">
                    {comic.chapters?.map((chapter) => (
                      <li key={chapter.id} className="list-group-item">
                        <Link to={`/chapter/${chapter.id}/`}>
                          {chapter.name.substr(0, 30)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <small className="text-center">No Chapter Found</small>
                )}
              </div>
            </div>
          ))}
        </Container>
      ) : (
        <small>No Chapter Found</small>
      )}
      <div className="text-center">
        <Paginate page={page} pages={pages} keyword={keyword} />
      </div>
    </section>
    // <Container>
    //   <div className="comics-container">
    //     {comics?.length > 0 ? (
    //       <Row>
    //         {comics?.map((comic) => (
    //           <div key={comic.id} className="comics-item">
    //             <Col>
    //               <Link to={`/comic/${comic.id}/`}>
    //                 <Image fluid src={comic.image} alt={comic.image} />
    //               </Link>

    //               <Button
    //                 className="btn btn-sm btn-default"
    //                 variant="secondary"
    //               >
    //                 {" "}
    //                 {comic?.category?.name}
    //               </Button>
    //             </Col>
    //             <br />
    //             <Col className="comics-meta">
    //               <Link to={`/comic/${comic.id}/`}>
    //                 <h5 className="text-center">{comic.title}</h5>
    //               </Link>
    //               <ul className="list-group">
    //                 <li className="list-group-item">
    //                   <strong>Status:</strong> {comic?.status}
    //                 </li>
    //                 <li className="list-group-item">
    //                   <Rating
    //                     value={comic?.rating}
    //                     text={`Rating: ${comic?.rating} `}
    //                     color={"#f8e825"}
    //                   />
    //                 </li>
    //                 {/* <li className="list-group-item">
    //                 <Nav className="ml-auto">
    //                   <NavDropdown title="Genres" id="genres">
    //                     {comic?.genres?.map((item) => (
    //                       <LinkContainer key={item.id} to={`/genre/${item.id}`}>
    //                         <NavDropdown.Item>{item.name}</NavDropdown.Item>
    //                       </LinkContainer>
    //                     ))}
    //                   </NavDropdown>
    //                 </Nav>
    //               </li> */}
    //               </ul>
    //             </Col>
    //             <Col>
    //               {comic?.chapters?.length > 0 ? (
    //                 <Nav className="ml-auto">
    //                   <NavDropdown title="Recent Chapters" id="chapters">
    //                     {comic?.chapters?.map((post) => (
    //                       <LinkContainer
    //                         key={post.id}
    //                         to={`/chapter/${post.id}`}
    //                       >
    //                         <NavDropdown.Item>{post.name}</NavDropdown.Item>
    //                       </LinkContainer>
    //                     ))}
    //                   </NavDropdown>
    //                 </Nav>
    //               ) : (
    //                 <small>No Chapter Found</small>
    //               )}
    //             </Col>
    //           </div>
    //         ))}
    //         <Paginate page={page} pages={pages} keyword={keyword} />
    //       </Row>
    //     ) : (
    //       <small>No Comic Added </small>
    //     )}
    //   </div>
    // </Container>
  );
};

export default Comics;
