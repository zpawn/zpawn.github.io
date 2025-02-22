import { CheckedItem as Cmp } from "../CheckedItem";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: 'Common/CheckedItem',
  component: Cmp,
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    checked: { control: "boolean" },
    onChange: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "task",
    label: "checked item",
    checked: true,
    onChange: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  },
};
