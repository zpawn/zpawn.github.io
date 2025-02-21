import { Title } from "../Title";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Title> = {
  title: 'Common/Title',
  component: Title,
  argTypes: {
    onClick: { table: { disable: true } },
    title: { control: "text" },
    externalLink: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "this is the title",
    externalLink: "https://thisis.link",
  },
};
