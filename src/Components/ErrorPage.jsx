import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oop! </h1>
      <p>An Error Occurs!</p>
      <p>
        <i>
          {error.status}&nbsp;&nbsp;{error.statusText}{" "}
        </i>
        <i>{error.data}&nbsp;&nbsp;{error.message} </i>
      </p>
    </div>
  );
}

export default ErrorPage
