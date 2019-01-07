import React from "react";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitIcon from "@material-ui/icons/ExitToApp";
import ListIcon from "@material-ui/icons/FormatListBulleted";
import GamepadIcon from "@material-ui/icons/Gamepad";

import NavigationItem from "./NavigationItem";

////

const navigationItems = () => (
  <List style={{ width: "250px" }}>
    <NavigationItem text="Dashboard" icon={<DashboardIcon />} />
    <NavigationItem route="/new" text="New" icon={<AddIcon />} />
    <NavigationItem route="/words" text="All Words" icon={<ListIcon />} />
    <NavigationItem
      route="/roulette/settings"
      text="Roulette"
      icon={<GamepadIcon />}
    />
    <NavigationItem route="/auth" text="Auth" icon={<ExitIcon />} />
  </List>
);

export default navigationItems;
