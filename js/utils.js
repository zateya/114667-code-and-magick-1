'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomInt = function (num) {
    return Math.round(Math.random() * num);
  };

  var getRandomArrayElement = function (arr) {
    return arr[getRandomInt(arr.length - 1)];
  };

  var getRandomBoolean = function () {
    return Boolean(Math.round(Math.random()));
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getRandomBoolean: getRandomBoolean
  };
})();
