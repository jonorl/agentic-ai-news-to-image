// Only Jest reads this; Vite builds the site with its own pipeline. import.meta.env is rewritten to
// process.env so tests can set VITE_* variables.
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: ["babel-plugin-transform-vite-meta-env"],
};
