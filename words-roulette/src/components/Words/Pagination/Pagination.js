import React from "react";
import { compose, withHandlers, setDisplayName } from "recompose";

import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

////

const pagination = compose(
  setDisplayName("WordsPagination"),

  withHandlers({
    onChangePage: () => () => {
      //... ToDo: implement this
    }
  })
)(({ onChangePage }) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        count={8}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[0]}
        colSpan={3}
        onChangePage={onChangePage}
      />
    </TableRow>
  </TableFooter>
));

export default pagination;
