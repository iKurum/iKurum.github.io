import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import OneDrive from '../pages/OneDrive';

function Nesting() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <OneDrive />
      </Route>
      <Route path={`${path}/:folder`}>
        <OneDrive />
      </Route>
    </Switch>
  );
}

export default Nesting;