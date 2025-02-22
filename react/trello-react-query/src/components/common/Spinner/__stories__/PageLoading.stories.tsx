import { PageLoading as Cmp } from "../PageLoading";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: 'Common/Spinner',
  component: Cmp,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PageLoading: Story = {
  args: {
    //..
  },
};
