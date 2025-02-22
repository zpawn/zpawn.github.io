import { Spinner as SpinnerCmp } from "../Spinner";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SpinnerCmp> = {
  title: 'Common/Spinner',
  component: SpinnerCmp,
  argTypes: {
    //..
  },
  render: () => (
    <div className="flex gap-1">
      <SpinnerCmp size="xs"/>
      <SpinnerCmp size="sm"/>
      <SpinnerCmp size="md"/>
      <SpinnerCmp size="lg"/>
      <SpinnerCmp size="xl"/>
      <SpinnerCmp size="2xl"/>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    //..
  },
};
