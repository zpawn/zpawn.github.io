import { Input } from "../Input";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  argTypes: {
    type: { table: { disable: true } },
    error: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Input label",
    placeholder: "Enter value",
    error: false,
  },
};
