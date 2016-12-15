// Inspired by https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js
export const canUseDom = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
