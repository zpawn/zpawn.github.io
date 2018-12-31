export default theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    maxWidth: "640px",
    margin: "0 auto"
  },

  content: {
    flex: "1 0 auto",
    position: "relative",
    padding: theme.spacing.unit * 2
  }
});
