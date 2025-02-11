import type { Preview } from "@storybook/react";
import "../styles.css";

// const fontLink = document.createElement("link");
// fontLink.rel = "stylesheet";
// fontLink.href = "https://rsms.me/inter/inter.css";
// document.head.appendChild(fontLink);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
