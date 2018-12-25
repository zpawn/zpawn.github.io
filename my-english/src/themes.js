import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-roboto";

////

const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: "light",
    primary: { main: "#2196f3" },
    secondary: { main: "#ffc400" }
  }
});

const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: "dark",
    primary: { main: "#757575" },
    secondary: { main: "#ffc400" }
  }
});

////

export { lightTheme, darkTheme };
