import React, { Fragment } from "react";

import Table from "@material-ui/core/Table";

import WordsHead from "./WordsHead";
import WordsRow from "./WordsRow";
import Pagination from "./Pagination";

////

const words = () => (
  <Fragment>
    <Table padding="none">
      <WordsHead />
      <WordsRow />
      <Pagination />
    </Table>
  </Fragment>
);

export default words;
