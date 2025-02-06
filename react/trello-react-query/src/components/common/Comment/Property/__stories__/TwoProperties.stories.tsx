import React from "react";
import { TwoProperties as TwoPropertiesCmp } from "../TwoProperties";

export default {
  title: "Core/Property",
  component: TwoPropertiesCmp,
  argTypes: {
    leftLabel: { control: "text" },
    leftText: { control: "text" },
    rightLabel: { control: "text" },
    rightText: { control: "text" },
  },
};

export const TwoProperties = () => (
  <>
    <TwoPropertiesCmp
      leftLabel={"Due date"}
      leftText={"01 Jan 2023"}
      rightLabel={"Deskpro ticket"}
      rightText={"3"}
    />
    <TwoPropertiesCmp
      leftLabel="Due date"
      leftText="01 Jan 2023"
      rightLabel="Deskpro ticket"
      rightText="Aut corporis cupiditate dolore dolorem et hic id illo minus, natus, nisi officia, officiis."
      rightCopyText="https://deskpro.com/apps"
    />
  </>
);
