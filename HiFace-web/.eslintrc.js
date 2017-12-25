module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "semi": [0, "always"],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  env: {            // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
    browser: true, // browser global variables.
    node: true, // Node.js global variables and Node.js scoping.
    worker: true, // web workers global variables.
    mocha: true, // adds all of the Mocha testing global variables.
    phantomjs: true, // PhantomJS global variables.
    serviceworker: true // Service Worker global variables.
  }
}
