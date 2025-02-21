import { TextField } from "../TextField";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  title: 'Form/TextField',
  component: TextField,
  argTypes: {
    name: { table: { disable: true } },
    label: { table: { disable: true } },
    required: { table: { disable: true } },
  },
  render: () => (
    <>
      <TextField name="username" label="username" rightIcon="user-circle" required/>
      <TextField name="password" label="password" rightIcon="lock-closed" required/>
    </>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
