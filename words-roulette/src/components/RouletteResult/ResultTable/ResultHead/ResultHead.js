import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { styles } from "./index";

////

const resultHead = ({ classes }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="none" />
      <TableCell align="center" className={classes.cell}>
        Questions
      </TableCell>
      <TableCell align="center">Answers</TableCell>
    </TableRow>
  </TableHead>
);

resultHead.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(resultHead);
