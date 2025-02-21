import { Comment as Cmp } from "../Comment";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: 'Common/Comment',
  component: Cmp,
  argTypes: {
    date: { control: "date" },
    text: { control: "text" },
    avatarUrl: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    text: "hey hop, let's go!!!",
    avatarUrl: "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg",
  },
};

export const WithoutImage: Story = {
  args: {
    date: new Date(),
    text: "hey hop, let's go!!!",
    avatarUrl: "",
  },
};
