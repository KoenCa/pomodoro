module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  plugins: ["compat", "prettier"],
  extends: ["eslint:recommended"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    "prettier/prettier": "error",
    "compat/compat": "off",
  }
};
