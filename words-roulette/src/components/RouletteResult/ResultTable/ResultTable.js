import React from "react";
import Table from "@material-ui/core/Table";

import ResultHead from "./ResultHead";
import ResultRow from "./ResultRow";

////

const resultTable = () => (
  <Table>
    <ResultHead />
    <ResultRow />
  </Table>
);

export default resultTable;
