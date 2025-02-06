import { PropertyRow as PropertyRowCmp } from "../PropertyRow";
import { Property } from "../Property";
import * as React from "react";
import { Pill, Stack } from "@deskpro/deskpro-ui";

export default {
  title: "Core/Property",
  component: PropertyRowCmp,
};

export const PropertyRow = () => {
  return (
    <Stack vertical gap={15}>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
        <Property label="key" text="value" marginBottom={0} />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
        <Property label="key" text="value" marginBottom={0} />
        <Property label="key" text="value" marginBottom={0} />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
        <Property label="key" marginBottom={0} />
        <Property
          label="key"
          text="most popular programming"
          marginBottom={0}
        />
        <Property label="key" text="value" marginBottom={0} />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
        {null}
        <Property
          label="key"
          text="most popular programming"
          marginBottom={0}
        />
        <Property label="key" text="value" marginBottom={0} />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
        <Property label="key" text="JavaScript" marginBottom={0} />
        <Property label="key" text="value" marginBottom={0} />
        <Property
          label="key"
          text="JavaScript it's the world"
          marginBottom={0}
        />
        <Property
          label="key"
          text="block with some copy text"
          marginBottom={0}
          copyText="https://deskpro.com/apps"
        />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property label="key" text="value" marginBottom={0} />
        <Property
          label="key"
          text={
            <Pill
              label="Pill"
              textColor="#FFFFFF"
              backgroundColor="#000000"
            ></Pill>
          }
          marginBottom={0}
        />
      </PropertyRowCmp>
      <PropertyRowCmp>
        <Property
          label="key"
          marginBottom={0}
          text="JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn."
        />
        <Property
          label="key"
          marginBottom={0}
          text="JavaScript is the world's most popular programming language."
        />
      </PropertyRowCmp>
    </Stack>
  );
};
