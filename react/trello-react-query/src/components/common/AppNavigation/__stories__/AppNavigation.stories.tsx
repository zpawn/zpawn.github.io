import { HashRouter } from "react-router-dom";
import { AppNavigation } from "../AppNavigation";
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

const RouterDecorator = (Story: StoryFn) => {
  window.location.hash = '/link_card';

  return (
    <HashRouter>
      <Story />
    </HashRouter>
  );
};

const meta = {
  title: 'Common/AppNavigation',
  component: AppNavigation,
  decorators: [RouterDecorator],
  argTypes: {
    nav: {
      control: "object",
    },
  },

} satisfies Meta<typeof AppNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nav: [
      { route: "/home", name: "Home" },
      { route: "/link_card", name: "Link Card" },
      { route: "/unlink", name: "Unlink Card" },
      { route: "/logout", name: "Logout" },
    ],
  },
};
