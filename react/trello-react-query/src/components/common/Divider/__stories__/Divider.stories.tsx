import { Divider } from "../Divider";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Divider> = {
  title: "Common/Divider",
  component: Divider,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
