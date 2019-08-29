module.exports = function(api){
  api.cache(true);
  const presets = [
    [
      "@babel/env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "70",
          safari: "11.1",
        },
        useBuiltIns: "usage",
        "corejs": 3
      },
    ],
  ];

  const plugins = [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }]
  ];

  return {
    presets,
    plugins
  }
}