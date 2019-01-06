import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ListItem from "@material-ui/core/ListItem";

////

const navigationItem = ({ icon, route, text }) => (
  <ListItem button component={NavLink} to={route}>
    {!icon ? null : <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText primary={text} />
  </ListItem>
);

navigationItem.defaultProps = {
  icon: null,
  route: "/"
};

navigationItem.propTypes = {
  icon: PropTypes.element,
  route: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default navigationItem;
