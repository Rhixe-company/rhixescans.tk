import React from "react";

import { Link } from "react-router-dom";

import { Col, Image } from "react-bootstrap";
const CharacterItem = ({ item }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <Link to={`/comic/${item.id}/`}>
            <Image fluid src={item.image} alt="" />
          </Link>
        </div>
        <div className="card-back">
          <Link to={`/comic/${item.id}/`}>
            <h1>{item.title.substr(0, 50)}</h1>
          </Link>

          <ul>
            <li>
              <strong>Author:</strong> {item.author}
            </li>
            <li>
              <strong>Artist:</strong> {item.artist}
            </li>
            <li>
              <strong>Status:</strong> {item.status}
            </li>
          </ul>
          <Col>
            {item.chapters?.length > 0 ? (
              <ul className="list-group">
                Recent Chapters:
                {item.chapters?.map((chapter) => (
                  <li key={chapter.id} className="list-group-item">
                    <Link to={`/chapter/${chapter.id}/`}>
                      {chapter.name.substr(0, 50)}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <small>No Chapter Found</small>
            )}
          </Col>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
