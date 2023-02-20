import React from "react";
import spinner from "../../spinner.gif";
import { Image } from "react-bootstrap";
function PostLoading(Component) {
  return function PostLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <>
        <Image
          src={spinner}
          style={{ width: "200px", margin: "auto", display: "block" }}
          alt="Loading"
        />
      </>
    );
  };
}
export default PostLoading;
