import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  injectStyle: false,
  external: ["react", "react-dom", "framer-motion", "howler"],
});
