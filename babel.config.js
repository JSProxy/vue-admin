module.exports = {
  presets: ["@vue/app"],
  plugins: [
    ["component", {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }],
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2, //指定@babel/runtime-corejs2  false则会使用@babel/rutime
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
};
