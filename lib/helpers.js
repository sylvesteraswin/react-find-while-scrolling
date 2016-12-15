Object.defineProperty(exports, "__esModule", {
    value: true
});
// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
var canUseDom = exports.canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);