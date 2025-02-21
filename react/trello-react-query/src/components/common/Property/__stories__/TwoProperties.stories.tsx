import { TwoProperties as Cmp } from "../TwoProperties";
import type { StoryObj } from "@storybook/react";

export default {
  title: "Common/Property",
  component: Cmp,
  argTypes: {
    leftLabel: { control: "text" },
    leftText: { control: "text" },
    rightLabel: { control: "text" },
    rightText: { control: "text" },
  },
  render: () => (
    <>
      <Cmp
        leftLabel={"Due date"}
        leftText={"01 Jan 2023"}
        rightLabel={"Deskpro ticket"}
        rightText={"3"}
      />
      <Cmp
        leftLabel="Due date"
        leftText="01 Jan 2023"
        rightLabel="Deskpro ticket"
        rightText="Aut corporis cupiditate dolore dolorem et hic id illo minus, natus, nisi officia, officiis."
      />
    </>
  ),
};

export const TwoProperties: StoryObj<typeof Cmp> = {};
