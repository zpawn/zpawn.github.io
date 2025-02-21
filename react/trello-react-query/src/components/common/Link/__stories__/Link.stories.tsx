import { Link } from "../Link";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Link> = {
  title: 'Common/Link',
  component: Link,
  argTypes: {
    //..
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "https://tailwindcss.com/",
    href: "https://tailwindcss.com/",
  },
};
