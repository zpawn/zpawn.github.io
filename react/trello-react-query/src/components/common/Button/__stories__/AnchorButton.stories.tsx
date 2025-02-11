import { AnchorButton } from "../AnchorButton";
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/AnchorButton',
  component: AnchorButton,
  argTypes: {
    type: { table: { disable: true } },
    intent: { table: { disable: true } },
    text: { control: "text" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    href: { table: { disable: true } },
  },
  // tags: ['autodocs'],

} satisfies Meta<typeof AnchorButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  argTypes:{
    type: { table: { disable: true } },
    intent: { table: { disable: true } },
  },
  args: {
    text: "Primary",
    intent: "primary",
    disabled: false,
    loading: false,
  },
};

export const Secondary: Story = {
  args: {
    text: "Secondary",
    intent: "secondary",
    disabled: false,
    loading: false,
  },
};


export const Minimal: Story = {
  args: {
    text: "Minimal",
    intent: "minimal",
    disabled: false,
    loading: false,
  },
};
