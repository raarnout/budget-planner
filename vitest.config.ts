import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react(), tsconfigPaths()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
          globals: true,
          setupFiles: ["./vitest.setup.ts"],
        },
      },
      {
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
      },
    ],
  },
});
