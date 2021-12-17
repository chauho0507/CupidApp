import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import { ROUTER } from '../constants/router';

const LoginLayout = ({ component: Component, ...props }) => {
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // if (userInfo) {
  //   return <Redirect to={ROUTER.HOME} />;
  // }
  return (
    <Route
      {...props}
      render={routeProps => (
        <>
          <Component {...routeProps} />
        </>
      )}
    />
  );
};

export default LoginLayout;
