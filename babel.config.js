module.exports = {
  // presets: [["@vue/app",{ useBuiltIns: 'usage' }]], 
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

// { useBuiltIns: 'entry' } //全部引入babel/polyfill

// ["@babel/preset-env", {  这里使用的是@vue/app 他内部 使用的是corejs 2
//   "useBuiltIns": "usage",
//   "corejs": 3
// }]
// {
//   polyfills: [   按需要引入
//     'es6.promise',
//     'es6.symbol'
//   ]
// }