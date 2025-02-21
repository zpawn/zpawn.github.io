import { Spinner } from "../Spinner";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
  component: Spinner,
  argTypes: {
    //..
  },
  render: () => (
    <div className="flex gap-1">
      <Spinner size="xs"/>
      <Spinner size="sm"/>
      <Spinner size="md"/>
      <Spinner size="lg"/>
      <Spinner size="xl"/>
      <Spinner size="2xl"/>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    //..
  },
};
