'use strict';

(function () {
  var ESCAPE_KEYCODE = 'Escape';
  var ENTER_KEYCODE = 'Enter';
  var SPACE_KEYCODE = 'Space';

  var isEscEvent = function (evt, action) {
    if (evt.code === ESCAPE_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.code === ENTER_KEYCODE) {
      action();
    }
  };

  var getBiggestNumber = function (numbers) {
    return Math.max.apply(null, numbers);
  };

  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * number);
  };

  var getRandomArrayItem = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  var shuffleArray = function (array) {
    var clonedItems = array.concat();
    var j;
    var temp;
    for (var i = clonedItems.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = clonedItems[j];
      clonedItems[j] = clonedItems[i];
      clonedItems[i] = temp;
    }
    return clonedItems;
  };


  window.util = {
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    SPACE_KEYCODE: SPACE_KEYCODE,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getBiggestNumber: getBiggestNumber,
    getRandomArrayItem: getRandomArrayItem,
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray
  };
})();
