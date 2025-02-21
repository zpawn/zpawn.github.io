import { LinkIcon as LinkIconCmp } from "../LinkIcon";
import { P } from "../../Typography";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LinkIconCmp> = {
  title: 'Common/Link',
  component: LinkIconCmp,
  argTypes: {
    //..
  },
  render: (props) => (
    <>
      <P>
        <LinkIconCmp {...props}/>
      </P>
      <P>
        Tailwind.css <LinkIconCmp {...props}/>
      </P>
    </>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LinkIcon: Story = {
  args: {
    href: "https://tailwindcss.com/",
  },
};
