import { Property as PropertyCmp } from "../Property";
import type { StoryObj } from "@storybook/react";

export default {
  title: "Common/Property",
  component: PropertyCmp,
  argTypes: {
    label: { control: "text" },
    text: { control: "text" },
    mb: { control: "boolean" },
  },
};

export const Property: StoryObj<typeof PropertyCmp> = {
  args: {
    label: "Label",
    text: "Property Content",
    mb: true,
  },
};
