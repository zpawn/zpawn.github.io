import { Property as PropertyCmp } from "../Property";
import type { StoryObj } from "@storybook/react";

export default {
  title: "Core/Property",
  component: PropertyCmp,
  argTypes: {
    label: { control: "text" },
    text: { control: "text" },
  },
};

export const Property: StoryObj<typeof PropertyCmp> = {
  args: {
    label: "Deskpro ticket",
    text: "",
    copyText: "some text to copy",
    marginBottom: 10,
  },
};
