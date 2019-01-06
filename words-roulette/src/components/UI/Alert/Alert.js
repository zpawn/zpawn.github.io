import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { styles } from "./index";

////

const alert = ({ children, isOpen, onClose, classes, variant, message }) => {
  return (
    <>
      {children ? children : null}
      <Snackbar
        className={classes.Alert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <SnackbarContent
          className={classes[variant]}
          aria-describedby="client-snackbar"
          message={message}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    </>
  );
};

alert.defaultProps = {
  isOpen: false,
  variant: "default"
};

alert.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object,
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"]),
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(alert);
