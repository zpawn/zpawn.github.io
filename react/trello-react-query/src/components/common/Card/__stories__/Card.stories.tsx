import { Card } from "../Card";
import type { ComponentProps } from "react";
import type { Meta, StoryObj } from '@storybook/react';

type CardProps = ComponentProps<typeof Card> & { size?: number };

const meta: Meta<typeof Card> = {
  title: "Common/Card",
  component: Card,
  render: ({ size }: CardProps) => (
    <Card style={{ border: "3px dotted red" }}>
      <Card.Media size={size} style={{ border: "3px dotted green" }}>media</Card.Media>
      <Card.Body style={{ border: "3px dotted blue" }}>body</Card.Body>
    </Card>
  ),
};

export default meta;

type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    size: 70,
  },
};
