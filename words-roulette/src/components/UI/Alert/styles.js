import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

////

export const styles = theme => ({
  Alert: {
    margin: "10px"
  },

  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  default: {}
});
