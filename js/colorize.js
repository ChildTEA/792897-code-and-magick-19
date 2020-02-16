'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var getRandomCoatColor = function () {
    return window.util.getRandomArrayItem(COAT_COLORS);
  };

  var getRandomEyesColor = function () {
    return window.util.getRandomArrayItem(EYES_COLORS);
  };

  var getRandomFireballColor = function () {
    return window.util.getRandomArrayItem(FIREBALL_COLORS);
  };

  var userCoat = function (element, input) {

    var onCoatClick = function () {
      var color = window.util.getRandomArrayItem(COAT_COLORS);
      input.value = color;
      element.style.fill = color;
    };

    var onCoatEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        var color = window.util.getRandomArrayItem(COAT_COLORS);
        input.value = color;
        element.style.fill = color;
      }
    };

    element.addEventListener('click', onCoatClick);
    element.addEventListener('keydown', onCoatEnterPress);
  };

  var userEyes = function (element, input) {

    var onEyesClick = function () {
      var color = window.util.getRandomArrayItem(EYES_COLORS);
      input.value = color;
      element.style.fill = color;
    };

    var onEyesEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        var color = window.util.getRandomArrayItem(EYES_COLORS);
        input.value = color;
        element.style.fill = color;
      }
    };

    element.addEventListener('click', onEyesClick);
    element.addEventListener('keydown', onEyesEnterPress);
  };

  var userFireball = function (element, input) {
    var onFireballClick = function () {
      var color = window.util.getRandomArrayItem(FIREBALL_COLORS);
      input.value = color;
      element.style.backgroundColor = color;
    };

    element.addEventListener('click', onFireballClick);

    var onFireballEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        var color = window.util.getRandomArrayItem(FIREBALL_COLORS);
        input.value = color;
        element.style.backgroundColor = color;
      }
    };

    element.addEventListener('keydown', onFireballEnterPress);
  };

  window.colorize = {
    getRandomCoatColor: getRandomCoatColor,
    getRandomEyesColor: getRandomEyesColor,
    getRandomFireballColor: getRandomFireballColor,
    userCoat: userCoat,
    userEyes: userEyes,
    userFireball: userFireball,
  };

})();
