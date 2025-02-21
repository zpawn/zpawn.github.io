import { Member as Cmp } from "../Member";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: "Common/Member",
  component: Cmp,
  argTypes: {
    member: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Member: Story = {
  args: {
    member: { id: "1", fullName: "Taras Shevchenko" },
  },
};
