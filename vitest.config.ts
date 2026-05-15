import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [
    storybookTest({
      configDir: ".storybook",
      storybookScript: "npm run storybook",
      storybookUrl: "http://localhost:6006",
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["@storybook/addon-vitest/internal/setup-file"],
  },
});
