(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.log = factory();
  }
}(this, function () {
  //    methods
  function myFunc(selector) {

  };
  //    exposed public method
  return console.log.bind(console);
}));
