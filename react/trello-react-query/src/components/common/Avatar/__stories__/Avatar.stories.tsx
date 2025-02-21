import { Avatar as Cmp } from "../Avatar";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: "Common/Avatar",
  component: Cmp,
  argTypes: {
    imageUrl: { control: "text" },
    size: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg",
    size: 18,
  },
};

export const WitoutImage: Story = {
  args: {
    imageUrl: null,
    size: 18,
  },
};
