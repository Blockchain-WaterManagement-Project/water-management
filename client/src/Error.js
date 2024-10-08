import React from "react";
import { useRouteError } from "react-router-dom";
import { FaSadCry } from "react-icons/fa";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-2">
      <FaSadCry size={40} />
      <h5 className="mt-3 mb-3">Oops!</h5>
      <p className="mb-3">Sorry! something unexpected has occurred.</p>
      <i>{error.statusText || error.message}</i>
    </div>
  );
}
