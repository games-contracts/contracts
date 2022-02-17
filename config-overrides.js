const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra");

const path = require("path");

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),

  addWebpackModuleRule({
    test: /\.css$/i,
    use: [
      // fallback to style-loader in development
      "style-loader",
      "css-loader",
    ],
  }),
  addWebpackModuleRule({
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          esModule: false,
        },
      },
    ],
  }),
);
