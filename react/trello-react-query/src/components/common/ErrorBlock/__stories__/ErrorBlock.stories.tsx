import { ErrorBlock } from "../ErrorBlock";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorBlock> = {
  title: 'Common/ErrorBlock',
  component: ErrorBlock,
  argTypes: {
    errors: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errors: [
      "error one",
      "error two",
      "very long error Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    ],
  },
};
