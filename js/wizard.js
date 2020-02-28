'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardElement = document.querySelector('.setup-player');
  var userCoat = wizardElement.querySelector('.setup-wizard-wrap .wizard-coat');
  var userCoatColorInput = wizardElement.querySelector('input[name="coat-color"');
  var userEyes = wizardElement.querySelector('.setup-wizard-wrap .wizard-eyes');
  var userEyesColorInput = wizardElement.querySelector('input[name="eyes-color"]');
  var userFireball = wizardElement.querySelector('.setup-fireball-wrap');
  var userFireballColorInput = wizardElement.querySelector('input[name="fireball-color"]');

  var userColors = {
    updateCoat: function (color) {
      return color || userCoatColorInput.value;
    },
    updateEyes: function (color) {
      return color || userEyesColorInput.value;
    }
  };

  var changeUserCoatColor = function () {
    var onUserCoatClick = function () {
      var color = window.util.getRandomArrayItem(COAT_COLORS);
      userCoatColorInput.value = color;
      userCoat.style.fill = color;
      userColors.updateCoat(color);
    };

    var onUserCoatEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        var color = window.util.getRandomArrayItem(COAT_COLORS);
        userCoatColorInput.value = color;
        userCoat.style.fill = color;
        userColors.updateCoat(color);
      }
    };

    userCoat.addEventListener('click', onUserCoatClick);
    userCoat.addEventListener('keydown', onUserCoatEnterPress);
  };

  var changeUserEyesColor = function () {

    var onUserEyesClick = function () {
      var color = window.util.getRandomArrayItem(EYES_COLORS);
      userEyesColorInput.value = color;
      userEyes.style.fill = color;
      userColors.updateEyes(color);
    };

    var onUserEyesEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        var color = window.util.getRandomArrayItem(EYES_COLORS);
        userEyesColorInput.value = color;
        userEyes.style.fill = color;
        userColors.updateEyes(color);
      }
    };

    userEyes.addEventListener('click', onUserEyesClick);
    userEyes.addEventListener('keydown', onUserEyesEnterPress);
  };

  var changeUserFireballColor = function () {
    var onFireballClick = function () {
      var color = window.util.getRandomArrayItem(FIREBALL_COLORS);
      userFireballColorInput.value = color;
      userFireball.style.backgroundColor = color;
    };


    var onFireballEnterPress = function (evt) {
      if (evt.code === window.util.ENTER_KEYCODE) {
        var color = window.util.getRandomArrayItem(FIREBALL_COLORS);
        userFireballColorInput.value = color;
        userFireball.style.backgroundColor = color;
      }
    };

    userFireball.addEventListener('click', onFireballClick);
    userFireball.addEventListener('keydown', onFireballEnterPress);
  };

  changeUserCoatColor();
  changeUserEyesColor();
  changeUserFireballColor();

  window.wizard = {
    userColors: userColors
  };
})();
