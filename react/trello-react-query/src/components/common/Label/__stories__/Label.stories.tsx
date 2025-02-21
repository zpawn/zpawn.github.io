import { Label } from "../Label";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
  title: 'Common/Label',
  component: Label,
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Field label",
    required: false,
  },
};
