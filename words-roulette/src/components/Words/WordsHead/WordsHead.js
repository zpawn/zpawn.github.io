import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { styles } from "./index";

////

const wordsHead = ({ classes }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="none" align="center">
        Word
      </TableCell>
      <TableCell padding="none" align="center">
        Translation
      </TableCell>
      <TableCell padding="none" className={classes.cellMenu} />
    </TableRow>
  </TableHead>
);

wordsHead.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(wordsHead);
