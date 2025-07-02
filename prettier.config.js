/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Standard Prettier options
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",
  // Tailwind CSS plugin will automatically sort classes
  tailwindConfig: "./tailwind.config.ts",
};

export default config;
