import React from "react";
import { withState } from "recompose";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";

import TopAppBar from "./TopAppBar";
import NavigationItems from "./NavigationItems";

////

const navigation = withState("isOpen", "isOpenToggle", false)(
  ({ isOpen, isOpenToggle }) => (
    <AppBar position="static">
      <TopAppBar onClick={isOpenToggle} />
      <Drawer open={isOpen} onClose={() => isOpenToggle(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => isOpenToggle(false)}
          onKeyDown={() => isOpenToggle(false)}
        >
          <NavigationItems />
        </div>
      </Drawer>
    </AppBar>
  )
);

export default navigation;
