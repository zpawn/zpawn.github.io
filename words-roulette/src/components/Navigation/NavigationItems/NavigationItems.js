import React from "react";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import NavigationItem from "./NavigationItem";

////

const navigationItems = () => (
  <List style={{ width: "250px" }}>
    <NavigationItem text="Dashboard" icon={<DashboardIcon />} />
    <NavigationItem route="/new" text="New" icon={<AddIcon />} />
    <NavigationItem route="/auth" text="Auth" icon={<ExitToAppIcon />} />
  </List>
);

export default navigationItems;
