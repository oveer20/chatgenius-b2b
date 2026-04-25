import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/widget.js"  // Widget público puede permanecer ignorado
    ]
  }
]);

export default eslintConfig;
