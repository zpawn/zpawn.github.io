import { P } from "../P";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof P> = {
  title: 'Common/Typography',
  component: P,
  argTypes: {
    intent: { table: { disable: false } },
    size: { table: { disable: false } },
  },
  render: () => (
    <>
      <P size="xs">XS Typography</P>
      <P size="sm">SM Typography</P>
      <P size="base">Base Typography</P>
      <P size="lg">LG Typography</P>
      <P size="xl">XL Typography</P>
      <P size="2xl">2XL Typography</P>
      <br />
      <P intent="base">Base Text</P>
      <P intent="secondary">Secondary</P>
      <P intent="info">Info</P>
      <P intent="warning">Warning</P>
      <P intent="danger">Danger</P>
    </>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {};
