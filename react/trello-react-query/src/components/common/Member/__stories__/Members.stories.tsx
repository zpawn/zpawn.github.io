import { Members as Cmp } from "../Member";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Cmp> = {
  title: "Common/Member",
  component: Cmp,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Members: Story = {
  args: {
    members: [
      { id: "1", fullName: "George R. R. Martin" },
      { id: "2",  fullName: "Jon Snow" },
      { id: "3", fullName: "Daenerys Targaryen" },
      { id: "4", fullName: "Sandor Clegane (The Hound)" },
      { id: "5", fullName: "Brienne of Tarth" },
    ],
  },
};
