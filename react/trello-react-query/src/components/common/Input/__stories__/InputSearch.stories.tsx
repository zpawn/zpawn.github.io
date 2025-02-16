import { InputSearch as Cmp } from "../InputSearch";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: 'Form/Input',
  component: Cmp,
  argTypes: {
    type: { table: { disable: true } },
    error: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InputSearch: Story = {
  args: {
    label: "Search Input"
  },
};
