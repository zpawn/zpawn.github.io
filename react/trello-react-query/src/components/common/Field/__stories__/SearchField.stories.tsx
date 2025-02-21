import { SearchField as Search } from "../SearchField";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Search> = {
  title: 'Form/TextField',
  component: Search,
  argTypes: {
    name: { table: { disable: true } },
    label: { table: { disable: true } },
    required: { table: { disable: true } },
    value: { control: "text" },
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchField: Story = {
  args: {
    value: "search value",
  },
};
