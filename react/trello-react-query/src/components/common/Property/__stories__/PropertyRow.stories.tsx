import { PropertyRow as Row } from "../PropertyRow";
import { Property } from "../Property";
import type { StoryObj } from "@storybook/react";

export default {
  title: "Common/Property",
  component: Row,
  render: () => (
    <div style={{ display: "flex", flexFlow: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "1rem" }}>
      <Row>
        <Property label="key" text="value" mb={false} />
      </Row>
      <Row>
        <Property label="key" text="value" mb={false} />
        <Property label="key" text="value" mb={false} />
      </Row>
      <Row>
        <Property label="key" text="value" mb={false} />
        <Property label="key" text="value" mb={false} />
        <Property label="key" text="value" mb={false} />
      </Row>
      <Row>
        <Property label="key" text="value" mb={false} />
        <Property label="key" mb={false} />
        <Property label="key" text="most popular programming" mb={false} />
        <Property label="key" text="value" mb={false} />
      </Row>
      <Row>
        <Property label="key" text="value" mb={false} />
        {null}
        <Property label="key" text="most popular programming" mb={false} />
        <Property label="key" text="value" mb={false} />
      </Row>
      <Row>
        <Property label="key" text="value" mb={false} />
        <Property label="key" text="JavaScript" mb={false} />
        <Property label="key" text="value" mb={false} />
        <Property label="key" text="JavaScript it's the world" mb={false} />
        <Property label="key" text="block with some copy text" mb={false} />
      </Row>
      <Row>
        <Property
          label="key"
          mb={false}
          text="JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn."
        />
        <Property
          label="key"
          mb={false}
          text="JavaScript is the world's most popular programming language."
        />
      </Row>
    </div>
  ),
};

export const PropertyRow: StoryObj<typeof Row> = {};
