import React, { Fragment } from "react";

import Table from "@material-ui/core/Table";

import WordsHead from "./WordsHead";
import WordsRow from "./WordsRow";

////

const words = () => (
  <Fragment>
    <Table padding="none">
      <WordsHead />
      <WordsRow />
    </Table>
  </Fragment>
);

export default words;
