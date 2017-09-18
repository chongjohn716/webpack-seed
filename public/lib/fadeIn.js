(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals (root is window)
    root.$fadeIn = factory(root.jQuery);
  }
}(this, function ($) {
  //    methods
  function myFunc(selector) {
    $(selector).fadeIn();
  };
  //    exposed public method
  return myFunc;
}));
