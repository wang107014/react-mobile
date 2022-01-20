import React, {FC, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
const Router: FC = () => (
  <Suspense
    fallback={
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      />
    }
  >
    <BrowserRouter basename="/html/boe">
      <Switch>
        {/* 首页 */}
        <Route
          path="/index"
          component={React.lazy(
            () => import(/* webpackChunkName: "HOME" */ '@/pages/Home'),
          )}
        />
        <Route
          path="/"
          component={React.lazy(
            () => import(/* webpackChunkName: "GoHome" */ '@/pages/Home'),
          )}
        />
      </Switch>
    </BrowserRouter>
  </Suspense>
);
export default Router;
