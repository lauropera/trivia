import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Game } />
    </Switch>
  );
}
