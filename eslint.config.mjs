import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/*.js",
      "**/*.mjs"
    ]
  }
]);

export default eslintConfig;
