'use strict';

(function () {
  var SIMILAR_WIZARDS_DOWNLOAD_URL = 'https://js.dump.academy/code-and-magick/data';

  var wizards = [];
  var userCoatColor = window.wizard.userColors.сoat();
  var userEyesColor = window.wizard.userColors.updateEyes();

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === userCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === userEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left === right) {
      return 0;
    }
    return left > right ? 1 : -1;
  };

  var updateWizards = function () {
    var sortedWizards = wizards.concat();

    sortedWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    window.render.wizards(sortedWizards);
  };

  window.wizard.userColors.updateCoat = window.debounce(function (color) {
    userCoatColor = color;
    updateWizards();
  });

  window.wizard.userColors.updateEyes = window.debounce(function (color) {
    userEyesColor = color;
    updateWizards();
  });

  var onRequestSuccess = function (data) {
    wizards = data;
    updateWizards();
  };

  var onRequestError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;

    document.body.prepend(node);
  };

  window.backend.load(SIMILAR_WIZARDS_DOWNLOAD_URL, onRequestSuccess, onRequestError);


  window.similar = {
    updateWizards: updateWizards
  };
})();
