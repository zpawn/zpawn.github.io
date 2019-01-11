import React from "react";
import { compose, withState, withHandlers, setDisplayName } from "recompose";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

////

const dottedMenu = compose(
  setDisplayName("Words/DottedMenu"),

  withState("anchorEl", "anchorElHandler", null),

  withHandlers({
    onClick: ({ anchorElHandler }) => e => anchorElHandler(e.currentTarget),

    onClose: ({ anchorElHandler }) => () => anchorElHandler(null)
  })
)(({ anchorEl, onClick, onClose }) => (
  <>
    <IconButton
      aria-owns={anchorEl ? "dottedMenu" : undefined}
      aria-haspopup="true"
      onClick={onClick}
    >
      <MoreVertIcon />
    </IconButton>

    <Menu
      id="dottedMenu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>Edit</MenuItem>
      <MenuItem onClick={onClose}>Remove</MenuItem>
    </Menu>
  </>
));

export default dottedMenu;
