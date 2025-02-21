import { HashRouter } from "react-router-dom";
import { TwoButtonGroup } from "../TwoButtonGroup";
import type { StoryObj, StoryFn } from "@storybook/react";

const RouterDecorator = (Story: StoryFn) => {
  window.location.hash = "/create_card";

  return (
    <HashRouter>
      <Story />
    </HashRouter>
  );
};

export default {
  title: "Common/TwoButtonGroup",
  component: TwoButtonGroup,
  decorators: [RouterDecorator],
  argTypes: {
    oneTitle: { control: "text" },
    twoTitle: { control: "text" },
    onePath: { control: "text" },
    twoPath: { control: "text" },
  },
};

export const Property: StoryObj<typeof TwoButtonGroup> = {
  args: {
    oneTitle: "Find Card",
    onePath: "/link_card",
    twoTitle: "Create Card",
    twoPath: "/create_card",
  },
};
