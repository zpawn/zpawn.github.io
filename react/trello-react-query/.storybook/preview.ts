import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import type { Preview } from "@storybook/react";
import "../src/styles.css";

TimeAgo.addDefaultLocale(en);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"]
};

export default preview;
