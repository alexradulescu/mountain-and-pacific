import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
    }),
    tsconfigPaths({ root: "./" }),
  ],
});
