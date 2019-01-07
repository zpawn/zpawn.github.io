import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard";
import Auth from "./Auth";
import New from "./New";
import Words from "./Words";
import RouletteSettings from "./RouletteSettings";

////

const router = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Route path="/new" component={New} />
    <Route path="/words" component={Words} />
    <Route path="/roulette/settings" component={RouletteSettings} />
    <Route path="/" exact component={Dashboard} />
    <Redirect to="/" />
  </Switch>
);

export default router;
