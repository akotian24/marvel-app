import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <h1>Error 404! Page Not Found</h1>
      <Link to="/">Home Page</Link>
    </div>
  );
}

export default Error;
