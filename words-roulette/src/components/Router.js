import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard";
import Auth from "./Auth";
import New from "./New";
import Words from "./Words";
import Word from "./Word";
import RouletteSettings from "./RouletteSettings";
import RouletteResult from "./RouletteResult";
import Roulette from "./Roulette";

////

const router = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Route path="/new" component={New} />
    <Route path="/words/:id" component={Word} />
    <Route path="/words" component={Words} />
    <Route path="/roulette/settings" component={RouletteSettings} />
    <Route path="/roulette/result" component={RouletteResult} />
    <Route path="/roulette" component={Roulette} />
    <Route path="/" exact component={Dashboard} />
    <Redirect to="/" />
  </Switch>
);

export default router;
