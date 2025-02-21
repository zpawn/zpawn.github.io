import { TrelloLink } from "../TrelloLink";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TrelloLink> = {
  title: 'Common/TrelloLink',
  component: TrelloLink,
  argTypes: {
    //..
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    //..
  },
};
